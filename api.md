# api の設計

## シフト[/shift]

### GET `between/{start}/and/{finish}`

> - start：最初のコマ
> - finish：最後のコマ

指定した期間のコマの内容を取得する

#### レスポンス

```json
{
  "week": [
    {
      "part": "String",
      "name1": true,
      "name2": true,
      "name3": true
    }
  ]
}
```

> それぞれの name に対する値は一つの boolean 型になっているが、name が定義される個数はそれぞれ変わる

- 200: データを取得できました
- 400: リクエストデータが無効です
- 404: データが見つかりません

### Post

指定したコマの内容を更新する

#### リクエスト

```json
{
  "update": [
    {
      "part": "string",
      "names": ["name1", "name2", "name3"]
    }
  ]
}
```

> シフトのコマごとのデータを全て上書きするので、指定されていない担当者は削除される

#### レスポンス

- 200: データを更新できました
- 400: リクエストデータが無効です

## ユーザー [/user]

### POST `create`

#### リクエスト

```json
{
  "name": "Ohtani",
  "display_name": "大谷",
  "password": "ohtani_pass",
  "is_admin": "boolean"
}
```

#### レスポンス

- 200: データを更新できました
- 400: リクエストデータが無効です

### GET `/{name}`

指定したユーザーの内容を取得する

#### レスポンス

```json
{
  "display_name": "String",
  "password": "String",
  "is_admin": "boolean"
}
```

- 200: データを取得できました
- 400: リクエストデータが無効です
- 404: データが見つかりません

### POST `login`

ログイン認証

#### リクエスト

```json
{
  "name": "String",
  "password": "String"
}
```

#### レスポンス

- 200: 認証に成功しました
- 400: リクエストデータが無効です
- 404: 認証に失敗しました

### PUT `update/{username}`

個人データ更新

#### リクエスト

```json
{
  "display_name": "大谷",
  "password": "ohtani_pass",
  "is_admin": "boolean"
}
```

#### レスポンス

- 200: データを更新できました
- 400: リクエストデータが無効です

### DELETE `{name}`

#### レスポンス

- 200: 削除に成功しました
- 400: リクエストデータが無効です
- 404: ユーザーが存在しません
