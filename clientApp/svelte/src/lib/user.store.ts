import { GenericStore } from '$lib/generic.store';

export type UserType = {
  telegramID: string;
  password: string;
  token: string;
  createdAt: Date;
};
export class UserStore extends GenericStore<UserType> {
  constructor() {
    super('User', {
      telegramID: '',
      password: '',
      token: '',
      createdAt: new Date(),
    });
  }

  credentialsAreCorrect(payload: Pick<UserType, 'password' | 'telegramID'>) {
    const { password, telegramID } = this.get();

    return password === payload.password && telegramID === payload.telegramID;
  }

  isEmpty() {
    const { telegramID, password, token } = this.get();
    return !telegramID || !password || !token;
  }
}
