# Nestjs の設計

## Nestjs のファイル構成

- appModule(RootModule)
  - UsersModule
    - UsersController
      - UsersService
    - AuthController
      - AuthService
  - ShiftsModule
    - ShiftsController
      - ShiftsService
  - DynamoDBModule
    - ClientService

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
