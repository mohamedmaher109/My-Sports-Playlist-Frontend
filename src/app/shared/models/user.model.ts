export interface User {
  id: string;
  username: string;
  email?: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface UserRegister {
  username: string;
  password: string;
  confirmPassword: string;
}