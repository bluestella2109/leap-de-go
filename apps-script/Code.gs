/**
 * LEAP改訂版でGO！
 * Google Apps Script側に貼り付けるコードです。
 *
 * 使い方:
 * 1. Googleスプレッドシート → 拡張機能 → Apps Script
 * 2. このコードを貼り付けて保存
 * 3. デプロイ → 新しいデプロイ → ウェブアプリ
 * 4. 「アクセスできるユーザー」を必要に応じて設定
 *
 * なお、現在のゲーム本体は公開CSVを直接読む方式なので、
 * このApps Scriptは将来の拡張用として同梱しています。
 */
function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const values = sheet.getDataRange().getValues();
  const headers = values.shift();
  const data = values.map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[String(h)] = row[i]);
    return obj;
  });
  return ContentService
    .createTextOutput(JSON.stringify({updatedAt:new Date().toISOString(),data}))
    .setMimeType(ContentService.MimeType.JSON);
}