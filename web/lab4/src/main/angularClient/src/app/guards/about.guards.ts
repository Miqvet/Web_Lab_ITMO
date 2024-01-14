import {inject} from "@angular/core";
import {AuthenticationService} from "../services/auth.service";

export const aboutGuard = () => {
  const authService = inject(AuthenticationService);
  return authService.isLogin();
};
