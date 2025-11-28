import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../firebase";
import { setDoc, doc, getDocs, collection } from "firebase/firestore";

const initialState = {
    isLoading: false,
    error: null,
    users: [],
    currentUser: {},
};

// ------------------------ GOOGLE LOGIN ------------------------
export const signInWithGoogle = createAsyncThunk(
    "user/signInWithGoogle",
    async () => {
        const result = await signInWithPopup(auth, provider);

        const user = {
            name: result.user.displayName,
            email: result.user.email,
        };

        await setDoc(doc(db, "users", user.email), {
            email: user.email,
        });

        return user;
    }
);

// ------------------------ EMAIL LOGIN ------------------------
export const signIn = createAsyncThunk(
    "user/signin",
    async ({ email, password }) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        const user = {
            name: userCredential.user.displayName,
            email: userCredential.user.email,
        };

        await setDoc(doc(db, "users", email), {
            email: email,
        });

        return user;
    }
);

// ------------------------ FETCH ALL USERS ------------------------
export const fetchUser = createAsyncThunk("user/fetch", async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = querySnapshot.docs.map((doc) => doc.data());
    return users;
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getuser: (state) => {
            state.currentUser = JSON.parse(localStorage.getItem("user") || "{}");
        },
    },

    extraReducers: (builder) => {
        builder
            // EMAIL LOGIN
            .addCase(signIn.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.isLoading = false;
                const user = action.payload;

                if (!state.users.find((e) => e.email === user.email)) {
                    state.users.push(user);
                }

                state.currentUser = user;
                localStorage.setItem("user", JSON.stringify(user));
            })
            .addCase(signIn.rejected, (state) => {
                state.isLoading = false;
                state.error = "Sign in failed";
            })

            // GOOGLE LOGIN
            .addCase(signInWithGoogle.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signInWithGoogle.fulfilled, (state, action) => {
                state.isLoading = false;
                const user = action.payload;

                if (!state.users.find((e) => e.email === user.email)) {
                    state.users.push(user);
                }

                state.currentUser = user;
                localStorage.setItem("user", JSON.stringify(user));
            })
            .addCase(signInWithGoogle.rejected, (state) => {
                state.isLoading = false;
                state.error = "Google Sign-in failed";
            })

            // FETCH USERS
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.users = action.payload;
                state.isLoading = false;
            });
    },
});

export default userSlice.reducer;
export const { getuser } = userSlice.actions;
