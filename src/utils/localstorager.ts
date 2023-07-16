import { User } from "../interface/user.interface";

export const saveUserToLocalStorage = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
};

export const getUserFromLocalStorage = () => {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
};

export const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
};
