const TOKEN_KEY = 'authToken'

export const login = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
}

export const isAuthenticated = () => {
    const token = getToken();
    return token !== null;
}