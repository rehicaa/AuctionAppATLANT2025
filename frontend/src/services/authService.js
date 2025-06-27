import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

const register = async (firstName, lastName, email, password) => {
    try {
        const response = await axios.post(API_URL + 'register', {
            firstName,
            lastName,
            email,
            password,
        });
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

const login = async (email, password) => {
    try {
        const response = await axios.post(API_URL + 'login', {
            email,
            password,
        });
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    try {
        return JSON.parse(localStorage.getItem('user'));
    } catch (error) {
        return null;
    }
};

const loginWithGoogle = async (token) => {
    try {
        const response = await axios.post(API_URL + 'google', { token });
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

const authService = {
    register,
    login,
    logout,
    getCurrentUser,
    loginWithGoogle,
};

export default authService;
