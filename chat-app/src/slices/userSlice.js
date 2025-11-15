import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../firebase.js'
import { provider } from '../../../firebase-app/src/Auth.js';
import { setDoc, doc, getDocs, collection } from 'firebase/firestore';
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
    await setDoc(doc(db, "users", email), {
        email: email,
        password: password
    })
    return user;
})
export const fetchUser = createAsyncThunk("user/fetch", async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = querySnapshot.docs.map((doc) => doc.data());
    return users;
});
export const signUp = createAsyncThunk('user/signup', async ({ email, password }) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = {
        name: userCredential.user.displayName,
        email: userCredential.user.email
    }
    return user;
})
export const signInWithGoogle = createAsyncThunk(
    "user/signInWithGoogle",
    async () => {

        const result = await signInWithPopup(auth, provider);
        const user = {
            name: result.user.displayName,
            email: result.user.email,
        };
        return user;

    }
);

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
            }).addCase(signUp.pending, (state, action) => {
                state.isLoading = true
            }).addCase(signUp.fulfilled, (state, action) => {
                state.isLoading = false
                state.users.push(action.payload)
                alert("sign up successfully")
            }).addCase(signUp.rejected, (state, action) => {
                state.isLoading = false
                state.error = "sign up process rejected";
            }).addCase(signInWithGoogle.pending, (state, action) => {
                state.isLoading = true
            }).addCase(signInWithGoogle.fulfilled, (state, action) => {
                state.isLoading = false
                state.users.push(action.payload)
            }).addCase(signInWithGoogle.rejected, (state, action) => {
                state.isLoading = false
                state.error = "signin with google rejected";
            }).addCase(fetchUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
            });
        }
    }
)

export default userSlice.reducer;