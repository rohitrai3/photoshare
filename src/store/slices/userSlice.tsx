import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface UserState {
  uid: string;
  username: string;
  name: string;
  photoUrl: string;
}

const initialState: UserState = {
  uid: "",
  username: "",
  name: "",
  photoUrl: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUid: (state, action: PayloadAction<string>) => {
      state.uid = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setPhotoUrl: (state, action: PayloadAction<string>) => {
      state.photoUrl = action.payload;
    },
  },
});

export const { setUid, setUsername, setName, setPhotoUrl } = userSlice.actions;
export const selectUid = (state: RootState) => state.user.uid;
export const selectUsername = (state: RootState) => state.user.username;
export const selectName = (state: RootState) => state.user.name;
export const selectPhotoUrl = (state: RootState) => state.user.photoUrl;
export default userSlice.reducer;
