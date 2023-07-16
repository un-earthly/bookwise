import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

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

export const loginUser = createAsyncThunk('auth/login', async ({ email, password }: { email: string; password: string }) => {
    // Replace this with your actual API call to login user
    // const response = await loginUserAPI(email, password);
    // return response.data;
    // For now, let's simulate a successful login
    return { email };
});


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser: (state) => {
            localStorage.removeItem('user');
            state.user = null;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(loginUser.pending, (state) => {
    //             state.loading = true;
    //             state.error = null;
    //         })
    //         .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ email: string }>) => {
    //             state.user = action.payload;
    //             state.loading = false;
    //             state.error = null;
    //         })
    //         .addCase(loginUser.rejected, (state, action) => {
    //             state.loading = false;
    //             state.error = action.error.message!;
    //         })
    //         .addMatcher((action) => action.type.endsWith('/rejected'), (state, action) => {
    //             state.loading = false;
    //             state.error = action.error.message;
    //         });

    // },
});
export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;

