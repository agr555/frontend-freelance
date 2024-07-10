import {AuthUtils} from "../../utils/auth-utils";
import {AuthServices as AuthService} from "../../services/auth-services";

export class Logout {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute; // для исп вне конструктора - сохраним в локальную переменную
        // if(!localStorage.getItem('accessToken') || !localStorage.getItem('refreshToken')){//если уже залогинен - на главную стр
        if(!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {//если уже залогинен - на главную стр){//если уже залогинен - на главную стр
            //также проверка, что refreshToken  существует
            return this.openNewRoute('/');
        }
        this.logout().then();//Promise returned from logout is ignored/
        // Чтобы это убрать,т.к. это мы никак не обрабатываем и в конструкторе это сделать не можем + .then()
    }

      async logout() {
          await AuthService.logOut();
   /*      await HttpUtils.request('/logout', 'POST', false,{
              refreshToken: AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)
          });*/
          AuthUtils.removeAuthInfo();
            this.openNewRoute('/login');// так ок!
    }
}