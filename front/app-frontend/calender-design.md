# カレンダーコンポーネントのデザイン

## 必要な機能

### 共通機能

    - 挿入されたデータをもとにそのデータが存在する曜日のみを表示する(必)
    - 表示させる時間の切り替え（必須）
    - 今日の日付の内容をワンクリックでできるように（中）
    - データを表示する範囲を週、月などで切り替える（小）

### 管理画面用の設定

    - ユーザーを割り当てられるようにシフトが決定したユーザー全てを表示させる(必)
    - ユーザーをカレンダーに追加、削除させることができる(必)

### 表示画面用の設定

    - シフトが決定したユーザー全てを表示させる(必)

## クラス構成

引数（Username: string,is_Admin: boolean）

- is_Admin

      管理画面なのかどうかの内訳

  - type: `boolean`

- Arrangements

      シフト情報内容 API の取得値

  - type `Record<string, Record<string, boolean>>`

  - +update( { is_added: boolean,newArrangements } )

- UserName（表示タイプが admin のときは空文字）

      使用しているユーザー

  - `type string`

- DisplayDate

      表示する日付の一覧

  - `type string[]`

  - +get()

  - +update(newArrangements)

- InitialDate

      表示する日付とは別に表示されてない日付けも含めた日付の初日

  - type `string`

- FinalDate

      InitialDate の最終日バージョン

  - type `string`
