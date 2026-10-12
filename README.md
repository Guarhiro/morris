# morris

帽子ブランドの紹介サイトです。

**公開URL: https://guarhiro.github.io/morris/**

- スタジオ写真がフェードインし、キャッチフレーズが現れるトップ
- スクロールでつながる帽子の紹介
- ネイビー・レッド・グレーの切り替えと詳細表示
- パソコン・スマートフォン対応、動きを抑える設定への対応

キャッチフレーズ: 「流行を、追わない。自分を、纏う。」

## 開発

Node.js 24.15.0 を使用します。

```sh
npm ci
npm run dev
```

表示先は開発サーバーの `/morris/` です。

## 公開

`main` へpushすると、GitHub Actionsがビルドし、GitHub Pagesへ自動公開します。
ビルドだけを確認する場合は `npm run build` を実行します。出力先は `dist/` です。

- `src/`: 画面と動き
- `public/assets/`: サイトに使う画像
- `index.html`: ページ情報
- `vite.config.mjs`: 公開パス
- `.github/workflows/deploy.yml`: 自動公開

掲載写真は商品写真をもとに生成したイメージです。価格・在庫・決済の連携は含みません。
