# dynamodb ドキュメント

## テーブル構成

### Users

id_amin は boolean 型その他は String 型

- id
- name
- password
- is_admin

### Shifts

全て String 型

- const_key
- part
- id1
- id2

id はシフトを担当する user の id が属性名として登録される

## テーブル管理

テーブル作成、管理は Terraform で行う

開発時のテーブルの作成は aws-sdk では行わないのでテストで挿入したデータはきちんと削除する
