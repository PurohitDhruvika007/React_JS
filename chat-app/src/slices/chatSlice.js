import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase.js'
import { doc, setDoc } from 'firebase/firestore';

const initialState = {
    chats: [],
    isLoading: false,
    error: null
}

export const sendMessage = createAsyncThunk("chat/post", async ({ sender, receiver }) => {
    const date = new Date();
    const chatId = (date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()).toString();
    const docId = sender + "_" + receiver;
    await setDoc(doc(db, "chatbox", docId, "chats", chatId), {
        message: "hello! this is an message"
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
            alert("message sent successfully");
        }).addCase(sendMessage.rejected, (state) => {
            state.error = "message is not able to sent";
            alert("message is not able to sent");
        })
    }
})

export default chatSlice.reducer;