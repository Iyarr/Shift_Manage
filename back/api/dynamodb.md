# dynamoDB の設計

## Users

- hashkey

  - id

- attribute

  - name(for login)
  - display_name
  - password
  - false_count
  - is_manager

## Shifts

- hashkey

  - id

- sortkey

  - date+partition(文字列として結合)

- attribute

  - user_id

```mermaid

graph LR

    A[RootModule] --> B[UserModule]
    A --> C[ShiftModule]
    A --> D[DynamoDBModule]
    B --> E[AuthController]
    B --> F[SettingController]
    C --> G[ShiftController]
    D --> H[ClientService]
    D --> I[TestController]

```
