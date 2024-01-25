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

  type UserItem = {
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

  type res = {
    status: number;
    message: string;
    data?: Record<string, string | boolean>;
  };
}
