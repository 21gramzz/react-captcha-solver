import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICaptchaConfig } from '../../../types';

interface IState {
  captchaConfig: ICaptchaConfig;
}

const initialState: IState = {
  captchaConfig: {
    host: 'http://www.supremenewyork.com',
    siteKey: '6LeWwRkUAAAAAOBsau7KpuC9AV-6J8mhw4AjC3Xz',
  },
};

const captchaConfigSlice = createSlice({
  name: 'captchaConfig',
  initialState,
  reducers: {
    saveCaptchaConfig(state: IState, action: PayloadAction<ICaptchaConfig>) {
      state.captchaConfig.host = action.payload.host;
      state.captchaConfig.siteKey = action.payload.siteKey;
    },
  },
});

export const { saveCaptchaConfig } = captchaConfigSlice.actions;

export default captchaConfigSlice;
