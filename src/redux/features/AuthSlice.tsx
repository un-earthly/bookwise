import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    user: any | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser: (state) => {
            localStorage.removeItem('user');
            state.user = null;
        },
        
    },
});
export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;

