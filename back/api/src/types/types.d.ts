declare module 'types-module' {
  type LoginUserData = {
    id: string;
    password: string;
  };

  type UpdateUserBody = {
    password?: string;
    name?: string;
    is_admin?: boolean;
  };

  type NewUserData = {
    id: string;
    password: string;
    name: string;
    is_admin: boolean;
  };

  type shift = {
    part: string;
    user_ids: string[];
    delete: boolean;
  };
}
