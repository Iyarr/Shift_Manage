// test-data.ts
export const GetTestUserData = () => {
  return [
    {
      id: 'Sato',
      password: 'satopass',
      name: '佐藤',
      is_admin: false,
    },
    {
      id: 'Kishimoto',
      password: 'kishimotopass',
      name: '岸本',
      is_admin: false,
    },
    {
      id: 'Yamada',
      password: 'yamadapass',
      name: '山田',
      is_admin: false,
    },
    {
      id: 'Ohtani',
      password: 'Ohtanipass',
      name: '大谷',
      is_admin: false,
    },
    {
      id: 'Taniyama',
      password: 'Tanipass',
      name: '谷山',
      is_admin: true,
    },
  ];
};

export const GetTestShiftData = () => {
  return [
    {
      part: '2022-05-01-X',
      names: ['Sato', 'Kishimoto'],
    },
    {
      part: '2022-05-02-X',
      names: ['Yamada'],
    },
    {
      part: '2022-05-03-X',
      names: ['Taniyama'],
    },
    {
      part: '2022-05-04-X',
      names: ['Sato', 'Kishimoto'],
    },
    {
      part: '2022-05-05-X',
      names: [],
    },
    {
      part: '2022-05-06-X',
      names: ['Sato'],
    },
  ];
};
