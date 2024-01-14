import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private tokenKey = 'jwtToken';
  private nameKey = 'userName';
  private username: string | null = null;
  private userToken: string | null = null;

  constructor() {
    const storedName: string|null = sessionStorage.getItem(this.nameKey);
    const storedToken: string|null = sessionStorage.getItem(this.tokenKey);
    if (storedName !== null && storedToken !== null){
      this.username = storedName;
      this.userToken = storedToken;
    }
  }

  setUsername(username: string) {
    this.username = username;
    // @ts-ignore
    sessionStorage.setItem(this.nameKey, this.username);
  }
  setToken(token: string){
    this.userToken = token;
    // @ts-ignore
    sessionStorage.setItem(this.tokenKey, this.userToken);
  }


  getUsername(): string | null  {
    return sessionStorage.getItem(this.nameKey);;
  }
  getToken():string|null{
    return sessionStorage.getItem(this.tokenKey)
  }
  getNameKey(): string{
    return this.nameKey
  }
  getTokenKey(): string{
    return this.tokenKey
  }

  isLogin(): boolean {
    return sessionStorage.getItem(this.tokenKey) !== null && sessionStorage.getItem(this.nameKey) !== null;
  }
  login(): void {
    if(this.userToken !== null || this.username !== null){
       // @ts-ignore
      sessionStorage.setItem(this.tokenKey, this.userToken);
      // @ts-ignore
      sessionStorage.setItem(this.nameKey, this.username);
    }
  }
  logout(): void {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.nameKey);
  }

}
