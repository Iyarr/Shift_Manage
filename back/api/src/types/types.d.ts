declare module 'types-module' {
  export type LoginUserData = {
    username: string;
    password: string;
  };

  export type UpdateUserItem = {
    password?: string;
    displayName?: string;
    isManager?: boolean;
  };

  export type NewUserData = {
    userName: string;
    password: string;
    displayName: string;
    isManager: boolean;
  };
}
