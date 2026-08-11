# Guild Countdown

ギルドイベントの開始までをリアルタイムで表示するカウントダウンPWAです。

## Features

- イベント名・開催日時の設定
- 日・時間・分・秒のリアルタイムカウントダウン
- 10分 / 30分 / 1時間 / 3時間後のクイック設定
- 設定をlocalStorageへ保存
- Service Workerによるオフライン対応
- スマートフォンでホーム画面へ追加可能

## Files

- `index.html` — UI
- `style.css` — レスポンシブデザイン
- `app.js` — カウントダウン・保存処理
- `manifest.json` — PWA設定
- `sw.js` — オフラインキャッシュ
- `icon.svg` — アプリアイコン
