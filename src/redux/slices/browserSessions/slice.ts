import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBrowserSession } from '../../../types';
interface IState {
  browserSessions: IBrowserSession[];
}

const initialState: IState = {
  browserSessions: [],
};

const browserSessionsSlice = createSlice({
  name: 'browserSessions',
  initialState,
  reducers: {
    createSession(state: IState, action: PayloadAction<IBrowserSession>) {
      state.browserSessions = [...state.browserSessions, action.payload];
    },
    deleteSession(state: IState, action: PayloadAction<IBrowserSession>) {
      state.browserSessions = state.browserSessions.filter(
        session => session.id !== action.payload.id,
      );
    },
    editSession(state: IState, action: PayloadAction<IBrowserSession>) {
      state.browserSessions.forEach((s, index) => {
        if (s.id === action.payload.id) {
          state.browserSessions[index] = action.payload;
        }
      });
    },
  },
});
export const {
  createSession,
  deleteSession,
  editSession,
} = browserSessionsSlice.actions;
export default browserSessionsSlice;
