# api の設計

## 公開シフト取得[/api/shift]

### シフト一覧表示

- エンドポイント

  - GET `/api/shift/week/{date}`

    date：表示する週の月曜日の日にち

- Request

  - header
    - Cookie

- Response 200 (application/json)

  - Content-Type:application/json

  ```json
  {
    "week": {[
        {
            "date": "2023/01/01",
            "member": {
                "X":["大谷","佐藤","山田"],
                "Y":["大谷","山田"],
                "Z":["山田","佐藤"],
                "A":["大谷"],
                "B":["山田"],
                "C":["佐藤"],
                "D":[]
            }
        },
        {
            "date": "2023/01/02",
            "member": {
                "X":["大谷","佐藤","山田"],
                "Y":["大谷","山田"],
                "Z":["山田","佐藤"],
                "A":["大谷"],
                "B":["山田"],
                "C":["佐藤"],
                "D":[]
            }
        }
        .....
    ]}
  }
  ```

### シフト更新

- エンドポイント

  - PATCH `/api/shift`

- Request

  - header
    - Content-Type:application/json
    - Cookie

  - Body

    ```json
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
    }
    ```

- Response 200 (application/json)

  - Content-Type:application/json

  ```json
  {
    "update": {
      "result": true
    }
  }
  ```

## ユーザー [/user]

### 認証トークン取得

- エンドポイント

  - POST `/api/auth`

- Request

  - header

  - Body

    ```js
    {
      "name": "ohtani"
      "password": "ohtani_pass"
    }
    ```

- Response 200 (application/json)

- ### Set-Cookie
  >
  > - sessionId="乱数"
  > - path="フロントエンドのFQDN"
  > - secure; HttpOnly
  
  ```json
  {
    "auth": {
      "result": true,
      "is_manager": false,
      "false_count": 0

    }
  }
  ```

- Response 404 (application/json)

  - Content-Type:application/json

  ```json
  {
    "auth": {
      "result": false
    }
  }
  ```

### 個人データ更新

- エンドポイント

  - POST `/api/user/{username}`

- Request

  username：取得したいユーザー名

  - header
    - Content-Type:application/json
    - Cookie

  - Body

    ```js
    {
      "display_name": "大谷"
      "name": "newohtani"
      "password": "ohtani_pass"
    }
    ```

- Response 200 (application/json)

  - Content-Type:application/json

  ```json
  {
    "update": {
      "result": true
    }
  }
  ```
