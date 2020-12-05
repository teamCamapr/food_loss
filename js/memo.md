# memo
## 食品投稿手順
1. `storage.js`の`loadFile()`を実行し、ファイルを選択ボタンから選択された画像ファイルを読み込む
2. `uploadPicture(file)`を`loadFile()`の返り値を引数`file`として与え、実行する
3. これにより、DBにデータが上がる
4. `uploadPicture(file)`の返り値としてアップロードされた画像のURIが返ってくる
5. `db.js`の`postFoodstuff()`を実行する