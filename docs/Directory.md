# 【WIP】実際に開発進めながらアップデートしていく想定

https://qiita.com/miumi/items/359b8a77bbb6f9666950

## Directory構成について（src配下）

```
├── app          ... ルーティングに関するコンポーネント
├── features     ... ロジック + コンポーネントをまとめたもの
│   ├── common   ... 共通部分
│   └── routes   ... 特定のページで使うもの
├── components   ... ロジックがない共通コンポーンネント
├── hooks        ... 共通ロジックの内、React Hooksが「ある」もの
├── utils        ... 共通ロジックの内、React Hooksが「ない」もの
└── constants    ... 定数を定義したファイル
```

### appディレクトリ

ルートページに関することを記述<br>
appディレクトリ内では`use client`を極力使用しない方向<br>
→useXXといったhooksは使わないため、Sever Componentだけになる想定

## featuresディレクトリ

ロジック+コンポーネントのファイルは全てfeaturesの中に記述する<br>
基本的にappディレクトリから呼び出されることになる

## componentsディレクトリ

ロジックのないロジックのない共通コンポーネント<br>
いろいろなところで使用できるUIに関することを記述<br>
Atomic Designでいう、Atoms, Moleculesにあたるコンポーネントが配置される想定

### components配下について
`Button`などのディレクトリを作成し、その配下に`Button.tsx`と`Button.stories.ts`ファイルを作成してください

```
├──components
     ├── Button
           ├── Button.tsx
           ├── Button.stories.ts
```

## hooksディレクトリ

共通ロジックのうち、React Hooksがあるものだけを記述<br>
特定のページだけに依存するようなロジックは、featuresディレクトリに記述する

## utilsディレクトリ

共通ロジックのうち、React Hooksがないものだけを記述<br>
文字の整形や、フォーマット、どこでも使えそうな汎用的な関数はここに書いていくことになりそう

## constantsディレクトリ

定数を定義したファイル群<br>
カラーコードなど定数として管理しておきたいもの
