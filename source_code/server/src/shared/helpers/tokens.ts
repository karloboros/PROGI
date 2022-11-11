import { ITokens } from 'shared/auth/types';
import { Response } from 'express';

const setAuthCookies = (tokens: ITokens, res: Response) => {
  const { accessToken, refreshToken } = tokens;
  res.cookie('accessToken', accessToken);
  res.cookie('refreshToken', refreshToken, { httpOnly: true });
};

const clearAuthCookies = (res: Response) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
};

export { setAuthCookies, clearAuthCookies };
