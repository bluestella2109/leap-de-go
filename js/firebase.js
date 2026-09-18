// このゲームはFirebaseを必須にせず、Google Sheetsを単語データベースとして使用します。
// 将来Firebaseを追加する場合は、このファイルを接続点として利用できます。
export const APP_CONFIG = {
  title: "LEAP改訂版でGO！",
  dataSource: "google-sheets"
};