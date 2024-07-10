import {AuthUtils} from "../../utils/auth-utils";
import {ValidationUtils} from "../../utils/validation-utils";
import {AuthServices as AuthService} from "../../services/auth-services";

export class SignUp {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute; // для исп вне конструктора - сохраним в локальную переменную

        // if(localStorage.getItem('accessToken')){//если уже залогинен - на главную стр
        if (AuthUtils.getAuthInfo(AuthUtils.accessTokenKey)) {//если уже залогинен - на главную стр
            return this.openNewRoute('/');
        }
        this.findElements();

        document.getElementById('process-button').addEventListener('click', this.signUp.bind(this))

        this.validations = [
            {element: this.nameElement},
            {element: this.lastNameElement},
            {element: this.emailElement, options: {pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/}},
            {element: this.passwordElement, options: {pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/}},
            {element: this.passwordRepeatElement, options: {compareTo: this.passwordElement.value}},
            {element: this.agreeElement, options: {checked: true}},

        ];
    }

    findElements() {
        this.nameElement = document.getElementById('name');
        this.lastNameElement = document.getElementById('last-name');
        this.emailElement = document.getElementById('email');
        this.passwordElement = document.getElementById('password');
        this.passwordRepeatElement = document.getElementById('password-repeat');
        this.agreeElement = document.getElementById('agree');
        this.commandErrorElement = document.getElementById('command-error');
    }

    async signUp() {
        this.commandErrorElement.style.display = 'none';

        for (let i = 0; i < this.validations.length; i++) {
            if (this.validations[i].element === this.passwordRepeatElement) {
                this.validations[i].options.compareTo = this.passwordElement.value;
            }
        }

        if (ValidationUtils.ValidateForm(this.validations)) {

            const signupResult = await AuthService.signUp({
                name: this.nameElement.value,
                lastName: this.lastNameElement.value,
                email: this.emailElement.value,
                password: this.passwordElement.value,
            });
            if (signupResult) {
                AuthUtils.setAuthInfo(signupResult.accessToken, signupResult.refreshToken, {
                    id: signupResult.id,
                    name: signupResult.name
                });
                return this.openNewRoute('/');
            }
            this.commandErrorElement.style.display = 'block';
        }
    }


}