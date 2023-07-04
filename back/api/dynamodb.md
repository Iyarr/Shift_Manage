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
