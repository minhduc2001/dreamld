export interface IUserGetByUniqueKey {
  phone?: string;
  email?: string;
}

export interface ICreateUser {
  phone: string;
  password: string;
}
