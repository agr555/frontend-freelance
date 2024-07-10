import {HttpUtils} from "../utils/http-utils";

export class AuthServices {
    static async logIn(data) {
        const result = await HttpUtils.request('/login', 'POST', false, data);
        if (result.error || !result.response || (result.response && (!result.response.accessToken || !result.response.refreshToken || !result.response.id || !result.response.name))) {
            return false; // чтобы остановить выполнение кода при ошибке авторизации
        }
        return result.response;
    }

    static async signUp(data) {
        const result = await HttpUtils.request('/signup', 'POST', false, data);
        if (result.error || !result.response || (result.response && (!result.response.accessToken || !result.response.refreshToken || !result.response.id || !result.response.name))) {
            return false; // чтобы остановить выполнение кода при ошибке авторизации
        }
        return result.response;
    }

    static async logOut(data) {
       await HttpUtils.request('/logout', 'POST', false, data);
    }
}