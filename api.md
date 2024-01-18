# api の設計

- [api の設計](#api-の設計)
  - [1. シフト\[/shift\]](#1-シフトshift)
    - [1.1 GET `/between/{start}/and/{finish}`](#11-get-betweenstartandfinish)
      - [レスポンス](#レスポンス)
    - [1.2 Post `/update`](#12-post-update)
      - [リクエスト](#リクエスト)
      - [レスポンス](#レスポンス-1)
  - [2. ユーザー \[/user\]](#2-ユーザー-user)
    - [2.1 POST `/create`](#21-post-create)
      - [リクエスト](#リクエスト-1)
      - [レスポンス](#レスポンス-2)
    - [2.2 GET `/{name}`](#22-get-name)
      - [レスポンス](#レスポンス-3)
    - [2.3 POST `/login`](#23-post-login)
      - [リクエスト](#リクエスト-2)
      - [レスポンス](#レスポンス-4)
    - [2.4 PUT `/update/{username}`](#24-put-updateusername)
      - [リクエスト](#リクエスト-3)
      - [レスポンス](#レスポンス-5)
    - [2.5 DELETE `/{name}`](#25-delete-name)
      - [レスポンス](#レスポンス-6)
  - [テストの実行](#テストの実行)
    - [テストするデータ](#テストするデータ)
    - [Users](#users)
    - [Shifts](#shifts)
  - [テスト用データの作成](#テスト用データの作成)
    - [使用するユーザー](#使用するユーザー)

## 1. シフト[/shift]

### 1.1 GET `/between/{start}/and/{finish}`

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

### 1.2 Post `/update`

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

## 2. ユーザー [/user]

### 2.1 POST `/create`

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

### 2.2 GET `/{name}`

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

### 2.3 POST `/login`

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

### 2.4 PUT `/update/{username}`

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

### 2.5 DELETE `/{name}`

#### レスポンス

- 200: 削除に成功しました
- 400: リクエストデータが無効です
- 404: ユーザーが存在しません

## テストの実行

API が適切に動作するのかをテストすための方法を決める
複数のデータを使用してなるべくいろいろなパターンでテストする
最終的には GithubActions 上で全てのテストを動作させる

### テストするデータ

- ステータスコード
- データ内容

### Users

テストの内容は以下になる

1. ユーザーの作成
2. ログイン
3. ユーザー情報の更新
4. ユーザー情報の取得
5. ユーザーの削除

### Shifts

1. シフト更新
2. シフト取得

## テスト用データの作成

### 使用するユーザー

```json
{
  "users": [
    {
      "id": "Sato",
      "password": "satopass",
      "name": "佐藤",
      "is_admin": false
    },
    {
      "id": "Kishimoto",
      "password": "kishimotopass",
      "name": "岸本",
      "is_admin": false
    },
    {
      "id": "Yamada",
      "password": "yamadapass",
      "name": "山田",
      "is_admin": false
    },
    {
      "id": "Ohtani",
      "password": "Ohtanipass",
      "name": "大谷",
      "is_admin": false
    },
    {
      "id": "Taniyama",
      "password": "Tanipass",
      "name": "谷山",
      "is_admin": true
    }
  ]
}
```
