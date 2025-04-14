import { Middleware } from '@reduxjs/toolkit';

import { authStorage } from '@/services';
import { authClearState, authSuccessRequest, authUpdateState } from '../auth';

export const tokenMiddleware: Middleware = _store => next => action => {
  if (authSuccessRequest.match(action) || authUpdateState.match(action)) {
    authStorage.setToken(action.payload);
  }

  if (authClearState.match(action)) {
    authStorage.removeToken();
  }

  return next(action);
};
