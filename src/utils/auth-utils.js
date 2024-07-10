import config from "../config/config";

export class AuthUtils {
    static accessTokenKey = 'accessToken';
    static refreshTokenKey = 'refreshToken';
    static userInfoTokenKey = 'userInfo';

    static setAuthInfo(accessToken, refreshToken, useInfo = null) {
        localStorage.setItem(AuthUtils.accessTokenKey, accessToken);
        localStorage.setItem(AuthUtils.refreshTokenKey, refreshToken);
        localStorage.setItem(AuthUtils.userInfoTokenKey, JSON.stringify(useInfo));
    }

    static removeAuthInfo() {
        localStorage.removeItem(AuthUtils.accessTokenKey);
        localStorage.removeItem(AuthUtils.refreshTokenKey);
        localStorage.removeItem(AuthUtils.userInfoTokenKey);
    }

    static getAuthInfo(key = null) {
        if (key && [this.accessTokenKey, this.refreshTokenKey, this.userInfoTokenKey].includes(key)) {
            return localStorage.getItem(key); // если элемент содержит ключ, вернуть именно его
        } else { //иначе вернуть все ключи
            return {
                [this.accessTokenKey]: localStorage.getItem(AuthUtils.accessTokenKey),
                [this.refreshTokenKey]: localStorage.getItem(AuthUtils.refreshTokenKey),
                [this.userInfoTokenKey]: localStorage.getItem(AuthUtils.userInfoTokenKey)
            }
        }
    }

    static async updateRefreshToken() {
        let result = false;
        const refreshToken = this.getAuthInfo(this.refreshTokenKey);
        if (refreshToken) {
            const response = await fetch(config.api + '/refresh', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({refreshToken: refreshToken})
            });
            if (response && response.status === 200) {
                const tokens = await response.json();
                if (tokens && !tokens.error) {
                    this.setAuthInfo(tokens.accessToken, tokens.refreshToken);
                    result = true;
                }
            }
        }
        if (!result) {
            this.removeAuthInfo();
        }
        return result;
    }

}