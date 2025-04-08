export interface IFormData {
  username: string;
  password: string;
}

export interface IAuthState {
  isAuth: boolean;
  error: string;
  loading: boolean;
}

export interface IAuthResponse {
  payload: { token: string } | null;
  error: string | null;
}

export interface IAuthContext extends IAuthState {
  login: (data: IFormData) => void;
  logout: () => void;
}
