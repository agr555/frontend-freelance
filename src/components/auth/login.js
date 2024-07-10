import {AuthUtils} from "../../utils/auth-utils";
import {ValidationUtils} from "../../utils/validation-utils";
import {AuthServices as AuthService} from "../../services/auth-services";

export class Login {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute; // для исп вне конструктора - сохраним в локальную переменную
        // if(localStorage.getItem('accessToken')){//если уже залогинен - на главную стр
        // if(localStorage.getItem(AuthUtils.accessTokenKey)){//если уже залогинен - на главную стр
        if (AuthUtils.getAuthInfo(AuthUtils.accessTokenKey)) {//если уже залогинен - на главную стр
            return this.openNewRoute('/');
        }
        this.findElements();

        this.validations = [
            {element: this.passwordElement},
            {element: this.emailElement, options: {pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/}},
        ];
    }

    findElements() {
        this.emailElement = document.getElementById('email');
        this.passwordElement = document.getElementById('password');
        this.rememberMeElement = document.getElementById('remember-me');
        this.commandErrorElement = document.getElementById('command-error');

        document.getElementById('process-button').addEventListener('click', this.login.bind(this))
    }

    async login() {
        this.commandErrorElement.style.display = 'none';
        if (ValidationUtils.ValidateForm(this.validations)) {

            const loginResult = await AuthService.logIn({
                email: this.emailElement.value,
                password: this.passwordElement.value,
                rememberMe: this.rememberMeElement.checked
            });
            if (loginResult) {
                AuthUtils.setAuthInfo(loginResult.accessToken, loginResult.refreshToken, {
                    id: loginResult.id,
                    name: loginResult.name
                });
                return this.openNewRoute('/');
            }
            this.commandErrorElement.style.display = 'block';
            /* const result = await HttpUtils.request('/login', 'POST', false, {
                 email: this.emailElement.value,
                 password: this.passwordElement.value,
                 rememberMe: this.rememberMeElement.checked
             });
             if (result.error || !result.response || (result.response && (!result.response.accessToken || !result.response.refreshToken || !result.response.id || !result.response.name))) {
                 this.commandErrorElement.style.display = 'block';
                 return; // чтобы остановить выполнение кода при ошибке авторизации
             }*/

            // window.location.href = '/';//так нельзя!!!
            //  this.openNewRoute('/');// так ок!
        }
    }
}