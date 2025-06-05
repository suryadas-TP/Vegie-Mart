import { createSlice} from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  token:null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.userInfo = action.payload.user;
       state.token = action.payload.token;
    },
    logoutUser(state) {
      state.userInfo = null;
         state.token = null;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
