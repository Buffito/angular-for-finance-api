import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    saveAuthData(token: string, userId: string){
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('userId', userId);
    }

    getToken(): string | null{
        return sessionStorage.getItem('token');
    }

    getUserId(): string | null{
        return sessionStorage.getItem('userId');
    }

    clearAuthData(){
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userId');
    }
}