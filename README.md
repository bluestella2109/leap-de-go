# LEAP改訂版でGO！ v3 — FULL ARCADE

## 追加した大型機能
- 意味が奥から迫ってくる3D風アニメーション
- 正解時に迫ってきた意味が爆発するエフェクト
- 3・2・1・GO!
- PERFECT / GREAT / MISS
- COMBO / FEVER ×2
- LIFE
- ENDLESS MODE
- BOSS STAGE + BOSS HP
- DAILY CHALLENGE
- XP / LEVEL / TITLE
- ミッション表示
- 苦手単語・復習
- 結果画面
- 4択キーボード
- iPad / スマホ対応
- 背景テーマ基盤
- ONLINE BATTLE UI / ROOMシステム
- Google Sheets公開CSVを毎回取得

## Google Sheets
現在の公開CSV:
https://docs.google.com/spreadsheets/d/e/2PACX-1vSlpVxxNOK5pVkNNVpTsDBAyzHpqssOUL9WtTQdU8iZvWqq-_h6U8OkRkdy5ONDHlxWtyxFGa2Cvxu-/pub?output=csv

推奨列:
ID | 英単語 | 意味 | 例文 | 例文の意味 | 覚えるポイント | 難易度 | カテゴリ | 出題可否

## オンライン対戦について
online.html はルーム作成・参加・対戦開始UIまで実装。
本当の別端末間リアルタイム同期にはFirebase Realtime Database（またはFirestore）の設定が必要です。
GitHub Pagesは静的ホスティングなので、対戦データは外部DBを使います。
次の工程では:
- Firebase Auth / 匿名ログイン
- rooms/{roomId}
- players/{uid}
- synchronized question seed
- answer timestamp
- score / combo / life
- disconnect handling
- rematch
を追加できます。
