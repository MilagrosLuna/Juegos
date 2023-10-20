import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../servicios/auth.service';

// export const activateGuard: CanActivateFn = (route, state) => {
//   return inject(AuthService).isUserLoggedIn();
// };

export const activateGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).isUserLoggedIn();
};
