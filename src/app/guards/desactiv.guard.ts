import { CanDeactivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../servicios/auth.service';

export const desactivGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return inject(AuthService).isUserLoggedIn();
};
