import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase.js'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';

const initialState = {
    chats: [],
    isLoading: false,
    error: null
}

export const readMessage = createAsyncThunk("chat/get", async ({ sender, receiver }) => {
    try {
        const users = [sender, receiver];
        users.sort();
        const docId = users[0] + "_" + users[1];
        const snapRef = collection(db, "chatbox", docId, "chats");

        const Snapshot = await getDocs(snapRef);

        const chats = Snapshot.docs.map(doc => doc.data());

        return chats;
    } catch (err) {
        console.log("READ ERROR:", err.message);
        throw err;
    }
});

export const sendMessage = createAsyncThunk("chat/post", async ({ sender, receiver, message }) => {

    const chatId = Date.now().toLocaleString();
    const users = [sender, receiver];
    users.sort();
    const docId = users[0] + "_" + users[1];
    await setDoc(doc(db, "chatbox", docId, "chats", chatId), {
        message: message,
        sender: sender,
        receiver: receiver
    })
})

const chatSlice = createSlice({
    name: "chats",
    initialState: initialState,
    extraReducers: (builder) => {
        builder.addCase(sendMessage.pending, (state) => {
            state.isLoading = true
        }).addCase(sendMessage.fulfilled, (state, action) => {
            state.isLoading = false;

        }).addCase(sendMessage.rejected, (state) => {
            state.error = "message is not able to sent";
            alert("message is not able to sent");
        }).addCase(readMessage.pending, (state) => {
            state.isLoading = true;
        }).addCase(readMessage.fulfilled, (state, action) => {
            state.isLoading = false;
            state.chats = action.payload;
        }).addCase(readMessage.rejected, (state) => {
            state.isLoading = false;
            state.error = "massage is not readable";
            console.log("message is not readable");
        });
    }
})

export default chatSlice.reducer;