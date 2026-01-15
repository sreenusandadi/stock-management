export interface User {
  id?: string;
  name: string;
  email: string;
  password?: string;
  role: "ADMIN" | "USER";
}

export interface UserLogin {
  email: string;
  password: string;
}
