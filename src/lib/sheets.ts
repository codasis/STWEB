import { getAccessToken } from './auth';

export async function exportToGoogleSheets(title: string, headers: string[], rows: any[][]) {
  const token = await getAccessToken();
  if (!token) throw new Error('Not authenticated');

  // 1. Create a new Spreadsheet
  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title,
      },
    }),
  });

  if (!createRes.ok) {
    const error = await createRes.json();
    throw new Error(`Failed to create spreadsheet: ${error.error?.message || createRes.statusText}`);
  }

  const spreadsheet = await createRes.json();
  const spreadsheetId = spreadsheet.spreadsheetId;

  // 2. Write data to the Spreadsheet
  const range = 'Sheet1!A1';
  const data = [headers, ...rows];

  const updateRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueInputOption=USER_ENTERED`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: data,
    }),
  });

  if (!updateRes.ok) {
    const error = await updateRes.json();
    throw new Error(`Failed to write data: ${error.error?.message || updateRes.statusText}`);
  }

  return spreadsheet.spreadsheetUrl;
}
