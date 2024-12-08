# Personal Color（何かいいアプリ名考えてw）

<!-- プロジェクトについて -->

<p>
  顔写真を元にパーソナルカラーを診断
</p>

## 使用技術一覧

<p style="display: inline">
  <!-- フロントエンド -->
  <!-- next.js -->
  <img src="https://img.shields.io/badge/-Next.js-000000.svg?logo=next.js&style=for-the-badge">
  <!-- react.js -->
  <img src="https://img.shields.io/badge/-React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <!-- typescript -->
  <img src="https://img.shields.io/badge/-TypeScript-ffffff?style=for-the-badge&logo=typescript&logoColor=#3178C6">
  <!-- tailwind -->
  <img src="https://img.shields.io/badge/-TailwindCSS-ffffff.svg?logo=tailwindcss&style=for-the-badge">
  <!-- インフラ -->
  <!-- github actions -->
  <!-- <img src="https://img.shields.io/badge/-githubactions-FFFFFF.svg?logo=github-actions&style=for-the-badge"> -->
  <!-- husky -->
  <img src="https://img.shields.io/badge/-husky-C2A633.svg?logo=&style=for-the-badge">
  <!-- vercel -->
  <img src="https://img.shields.io/badge/-vercel-000000.svg?logo=vercel&style=for-the-badge">
</p>

## 環境構築

以下の手順に従って環境構築してください

```bash
$ git clone https://github.com/D-suke0614/personal-color.git
$ cd ./personal-color
$ npm ci
```

### Node.jsについて
node ^18.18.0 || ^19.8.0 || >= 20.0.0を使用してください

### husky(lint-staged)について

コミット前に、ステージングしたファイルを対象に以下を実行します。

- eslint
- prettier

### ESLintなどの設定について

以下の項目については[こちらの記事](https://zenn.dev/siakas/articles/05481bdefacd13)を参考に設定しているので、興味あれば読んでみてください。

- eslint
- prettier
- husky
- .editorconfig
- .vscode/setting.json

## 開発手順

[こちらの内容](./doc/ブランチ運用について.md)に従ってブランチを切り、ローカルサーバを起動させて開発を進めてください

```bash
$ npm run dev
```

ローカルサーバにアクセス

http://localhost:3000

## 本番環境
https://personal-color-tau.vercel.app/
