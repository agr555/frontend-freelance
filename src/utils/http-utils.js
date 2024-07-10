import config from "../config/config";
import {AuthUtils} from "./auth-utils";

export class HttpUtils {
    static async request(url, method = "GET", useAuth = true, body = null) {
        const result = {
            error: false,
            response: null
        };

        const params = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        };
        let token = null;
        if (useAuth) {
            // let token = localStorage.getItem(AuthUtils.accessTokenKey);//old
             token = AuthUtils.getAuthInfo(AuthUtils.accessTokenKey);//new
            if (token) {
                params.headers['authorization'] = token;
            }
        }
        if (body) {
            params.body = JSON.stringify(body);
        }

        let response = null;
        try {
            response = await fetch(config.api + url, params);
            result.response = await response.json();
        } catch (e) {
            result.error = true;
            return result;
        }
        console.log(response?.status);
        if (response.status < 200 || response.status >= 300) {
            result.error = true;
            if (useAuth && response.status === 401) {
                //1) нет токена
                if (!token) {
                    // return location.href = '/login';//нельзя  - чтобы не запустилось заново прилож
                    // return this.openNewRoute ('/login'); //так тут тоже не получится
                    result.redirect = '/login'; //вот так
                } else {
                    // 2)токен "старый" и его надо обновить/ тут для этого спец. есть запрос
                    // const updateTokenResult =  AuthUtils.updateRefreshToken(); //вернет promise<boolean> !!!
                    const updateTokenResult = await AuthUtils.updateRefreshToken();//вернет boolean!!!
                    if (updateTokenResult) {
                        //запрос провторно
                        return this.request(url, method, useAuth, body);
                    } else {
                        result.redirect = '/login'; //вот так
                    }
                }
            }
        }
        return result;
    }
}