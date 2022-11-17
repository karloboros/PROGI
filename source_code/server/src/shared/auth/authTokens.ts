import * as dotenv from 'dotenv';
import Audience from './audience';
import { ITokenType } from 'user/types';

dotenv.config({ path: '/etc/secrets/.env' });
console.log(process.env);

const authTokens = {
  type: {
    ACCESS: 'ACCESS' as ITokenType,
    REFRESH: 'REFRESH' as ITokenType,
  },
  config: {
    ACCESS: {
      secret: process.env.ACCESS_TOKEN_SECRET || '',
      duration: process.env.ACCESS_TOKEN_DURATION,
      audience: Audience.Scope.Access,
    },
    REFRESH: {
      secret: process.env.REFRESH_TOKEN_SECRET || '',
      duration: process.env.REFRESH_TOKEN_DURATION,
      audience: Audience.Scope.Refresh,
    },
  },
};

export default authTokens;
