import {ENDPOINTS} from "../config/api";

class AuthService {
    login(email, password) {
        let data = {email, password};

        // Login
        axios.post(ENDPOINTS.LOGIN, data)
            .then(data => {
                this.updateTokens(data.token, data.refresh_token);
                return Promise.resolve(data);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }

    register(name, email, password) {
        let data = {name, email, password};

        // Login
        axios.post(ENDPOINTS.REGISTER, data)
            .then(data => {
                this.updateTokens(data.token, data.refresh_token);
                return Promise.resolve(data);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }

    refreshToken() {
        // Get refresh token
        axios.post(ENDPOINTS.LOGIN_REFRESH, this.getRefreshToken())
            .then(data => {
                this.updateTokens(data.token, data.refresh_token);
                return Promise.resolve(data);
            })
            .catch(error => {
                this.logout();
                return Promise.reject(new Error('Refresh and Access Tokens have expired'));
            });
    }

    isLoggedIn() {
        return Boolean(localStorage.getItem('token'));
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
    }

    updateTokens(token, refreshToken) {
        localStorage.setItem('token', token);
        localStorage.setItem('refresh_token', refreshToken);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    getRefreshToken() {
        return localStorage.getItem('refresh_token');
    }
}

export default new AuthService();