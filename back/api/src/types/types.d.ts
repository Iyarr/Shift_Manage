declare module 'types-module' {
  export type LoginUserData = {
    id: string;
    password: string;
  };

  export type UpdateUserBody = {
    password?: string;
    name?: string;
    is_admin?: boolean;
  };

  export type NewUserData = {
    id: string;
    password: string;
    name: string;
    is_admin: boolean;
  };

  export type shift = {
    part: string;
    user_ids: string[];
    delete: boolean;
  };
}
