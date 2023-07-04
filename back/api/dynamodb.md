# dynamoDB の設計

## サイトからの資料

- [DynamoDB の仕組みの解説](https://www.sbbit.jp/article/cont1/95515#head1)

## 設計で考慮すること

- RDB と比べて何ができないのか

  - 結合、外部キー
  - プライマリーキー以外の条件指定
  - 複問い合わせ
  - 集約関数
  - OR、NOT などの演算子

- RDB の機能を補填するために設計でやるべきこと

  - PK の選択
  - 問い合わせ回数を最小限にできる構成

- ID を使ったテーブル設計について
  - まずできるのかできないのか
  - 出来る場合、クエリの件数に違いがあるのか
  - 使わない場合はどういう設計にするのか

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

  - date+partition(文字列として結合)

- sortkey

  - user_id

### Example

```json
[
  {
    "partition": "2023-06-29-B",
    "userID": 0
  },
  {
    "partition": "2023-06-29-C",
    "userID": 0
  },
  {
    "partition": "2023-06-29-C",
    "userID": 1
  },
  {
    "partition": "2023-06-29-D",
    "userID": 1
  }
]
```
