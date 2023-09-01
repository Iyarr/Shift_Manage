# api の設計

## 公開シフト取得[/api/shift]

### シフト一覧表示

- エンドポイント

  - GET `/api/shift/week/{date}`

    date：表示する週の月曜日の日にち

- Response 200 (application/json)

  - Content-Type:application/json

  ```json
  /*
  {
    "week": {
        {
            "partition": "2023-01-01-X",
            "name": ["大谷","佐藤","山田"],
        },
        {
            "partition": "2023-01-01-Y",
            "name": ["大谷","山田"],
        },
        {
            "partition": "2023-01-01-Z",
            "name": ["山田","佐藤"],
        },
        {
            "partition": "2023-01-01-A",
            "name": ["大谷"],
        },
        {
            "partition": "2023-01-01-B",
            "name": ["山田"],
        },
        {
            "partition": "2023-01-01-C",
            "name": ["佐藤"],
        },
        {
            "partition": "2023-01-01-D",
            "name": [],
        },
        {
            "partition": "2023-01-02-X",
            "name": ["大谷","佐藤","山田"],
        },
        {
            "partition": "2023-01-02-Y",
            "name": ["大谷","山田"],
        },
        {
            "partition": "2023-01-02-Z",
            "name": ["山田","佐藤"],
        },
        {
            "partition": "2023-01-02-A",
            "name": ["大谷"],
        },
        {
            "partition": "2023-01-02-B",
            "name": ["山田"],
        },
        {
            "partition": "2023-01-02-C",
            "name": ["佐藤"],
        },
        {
            "partition": "2023-01-02-D",
            "name": [],
        },
        .....
    }
  } */
  ```

### シフト更新

- エンドポイント

  - PATCH `/api/shift/user`

- Request

  - Content-Type:application/json

  - Body

    ```json
    /*
    {
      "update": [
        {
          "date": "2023/01/01",
          "partition": "x",
          "user": "ohtani"
        },
        {
          "date": "2023/01/04",
          "partition": "A",
          "user": "ohtani"
        }
      ]
    } */
    ```

## ユーザー [/user]

### 認証トークン取得

- エンドポイント

  - POST `/api/auth`

- Request

  - Content-Type:application/json
  - Body

    ```js
    {
      "name": "ohtani"
      "password": "ohtani_pass"
    }
    ```

- Response 200 (application/json)

  - Content-Type:application/json

  ```json
  {
    "result": true,
    "is_manager": false,
    "false_count": 0
  }
  ```

### 個人データ更新

- エンドポイント

  - POST `/api/user/{username}`

- Request

  username：取得したいユーザー名

  - Body

    ```js
    {
      "display_name": "大谷"
      "name": "newohtani"
      "password": "ohtani_pass"
    }
    ```
