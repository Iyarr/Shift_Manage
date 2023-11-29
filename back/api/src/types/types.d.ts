declare module 'types-module' {
  export type LoginUserData = {
    user_id: string;
    password: string;
  };

  export type UpdateUserBody = {
    password?: string;
    name?: string;
    is_admin?: boolean;
  };

  export type NewUserData = {
    user_id: string;
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
