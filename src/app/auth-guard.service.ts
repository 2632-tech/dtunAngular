import {Injectable} from '@angular/core';
import {CanActivate,Router} from '@angular/router';

@Injectable()

export class AuthGuard implements CanActivate {

    constructor(
        private router:Router
    ){}
    canActivate(){
        console.log('authGuard#canActivate called');
        const token = window.localStorage.getItem('auth_token');
        if(!token){
        this.router.navigate(['/signup'])
        return false//不能继续导航
        }
        // 通过继续
        return true;
    }
};
