# LEAP改訂版でGO！

Google Sheets連携型の英単語ゲームです。

## フォルダ構成

- `index.html` — トップ・モード選択
- `game.html` — 3モード共通ゲーム
- `study.html` — 単語学習
- `result.html` — プレイヤーデータ
- `css/` — UI / ゲーム演出
- `js/` — ゲームロジック・Sheets取得
- `apps-script/Code.gs` — 将来のAPI方式用

## Google Sheets

1行目は次の列名にしてください。

`ID | 英単語 | 意味 | 例文 | 例文の意味 | 覚えるポイント | 難易度`

現在のゲームは、指定された公開スプレッドシートのCSVを読み込みます。

公開URL:
https://docs.google.com/spreadsheets/d/e/2PACX-1vSlpVxxNOK5pVkNNVpTsDBAyzHpqssOUL9WtTQdU8iZvWqq-_h6U8OkRkdy5ONDHlxWtyxFGa2Cvxu-/pubhtml

## GitHub Pages

リポジトリのルートにこのフォルダ内のファイルを配置し、GitHub Pagesを有効にしてください。

## 注意

GitHub Pagesは静的ホスティングなので、Google Sheetsの公開設定が必要です。
