# api の設計

## 公開シフト取得[/shift]

### シフト一覧表示

- エンドポイント

  - GET `between/{:stpartition}/and/{:fipartition}`

    stpartition：表示する日の最初のコマ

- Response 200 (application/json)

  - Content-Type:application/json

  ```json
  {
    "week": {
        {
            "partition": "2023-01-01-X",
            "sato": true,
            "yamada": true,
            "Ohtani": true,
        },
        {
            "partition": "2023-01-01-Y",
            "yamada": true,
            "Ohtani": true,
        },
        {
            "partition": "2023-01-01-Z",
            "sato": true,
            "yamada": true,
        },
        {
            "partition": "2023-01-01-A",
            "Ohtani": true,
        },
        {
            "partition": "2023-01-01-B",
            "yamada": true,
        },
        {
            "partition": "2023-01-01-C",
            "sato": true,
        },
        .....
    }
  }
  ```

### シフト更新

シフトのコマの担当者の内訳の更新データを上書きするので、指定されていない担当者は削除される

- エンドポイント

  - Post ``

- Request

  - Content-Type:application/json

  - Body

    ```json
    {
      "update": [
        {
          "partition": "2023-01-01-X",
          "persons": ["sato", "ohtani", "yamada"],
          "delete": false
        },
        {
          "partition": "2023-01-01-Y",
          "persons": ["ohtani", "yamada"],
          "delete": false
        }
      ]
    }
    ```

## ユーザー [/user]

### 認証トークン取得

- エンドポイント

  - POST `/login`

- Request

  - Content-Type:application/json
  - Body

    ```json
    {
      "name": "ohtani",
      "password": "ohtani_pass"
    }
    ```

- Response 200 (application/json)

  - Content-Type:application/json

  ```json
  {
    "is_manager": false
  }
  ```

### 個人データ更新

- エンドポイント

  - POST `/update/{:username}`

- Request

  - Body

    ```json
    {
      "display_name": "大谷",
      "password": "ohtani_pass",
      "isManager": false
    }
    ```

### 個人データ作成

- エンドポイント

  - POST `/create`

- Request

  - Body

    ```json
    {
      "userName": "Ohtani",
      "display_name": "大谷",
      "password": "ohtani_pass",
      "isManager": false
    }
    ```

### 個人データ削除

- エンドポイント

  - Get `/delete/{:username}`

- Request

  username：取得したいユーザー名
