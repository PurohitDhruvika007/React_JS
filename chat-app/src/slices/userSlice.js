import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.js'
const initialState = {
    users: [],
    isLoading: false,
    error: ""
}
export const signIn = createAsyncThunk('user/signin', async ({ email, password }) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = {
        name: userCredential.user.displayName,
        email: userCredential.user.email
    }
    return user;
})
const userSlice = createSlice(
    {
        name: "user",
        initialState: initialState,
        extraReducers: (builder) => {
            builder.addCase(signIn.pending, (state, action) => {
                state.isLoading = true
            }).addCase(signIn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users.push(action.payload)
                alert("user signin successfully")
            }).addCase(signIn.rejected, (state, action) => {
                state.isLoading = false;
                state.error = "sign in process rejected";
            });
        }
    }
)

export default userSlice.reducer;