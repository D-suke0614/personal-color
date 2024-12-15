## タスク管理について
IssuesとProjectsを使ってタスク管理しています。

### タスクを追加するとき
1. ProjectsのTodoに追加
   1. タイトルを入力
   2. 「Create new Issue」をクリック or ⌘↵
   3. 課題の内容記述して作成（できるだけ詳しく書いてね！）

### タスクに着手するとき
1. Projects内の着手する課題のステータスを「In Progress」に変更
2. [ブランチの作成](#ブランチの作成)に従って、ブランチを切って対応
3. 対応が完了したら、[PRの作成](#prの作成)に従って、PRを作成しレビュー依頼

※ファイルの配置先に困ったら[Directory](./Directory.md)を参考にしてください

## ブランチの役割
- main: リリースされているブランチ。mainブランチ=本番環境
- feat/xxxxxxxx: 作業用のブランチ。mainブランチから分岐しmainブランチにPRを作成し、マージする。
- poc/xxxxxxxx: 検証用のブランチ。mainブランチから分岐し基本的にどこにもマージはしない。pocの内容がそのまま使える場合のみ、mainブランチに対してPRを作成し、マージしてもよい。

## ブランチの作成
以下の手順でmainブランチからfeatureブランチを作成します
```
$ git checkout main
$ git pull origin main
$ git checkout -b feat/#issues番号-xxxxxxxx
// feat/#1-create_button_component
```

## PRの作成
担当チケットの実装が終わったら、テンプレートに従ってmainブランチに対してPRを作成してください。

PRが作成できたらレビュー依頼を出して、1人以上からapproveがもらえたらマージしてOKです。

マージされたら自動でIssueは閉じられ、Projectsの課題ステータスも「Done」になります。
