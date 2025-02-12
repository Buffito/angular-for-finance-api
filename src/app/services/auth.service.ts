import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    saveAuthData(token: string, id: number){
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('userId', id.toString());
    }

    getToken(): string | null{
        return sessionStorage.getItem('token');
    }

    getUserId(): number {
        const userId = sessionStorage.getItem('userId');
        return userId ? parseInt(userId, 10) : 0;
      }

    clearAuthData(){
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userId');
    }
}