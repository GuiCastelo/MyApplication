import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FloaterNotificationSeverity } from "../types";
import { FloaterNotificationInterface } from "../interfaces/floater-notification.interface";

const initialFloaterNotificationState: FloaterNotificationInterface = {
  severity: "info",
  message: "",
  show: false,
  timeout: 5000
};

export const floaterNotificationSlice = createSlice({
  name: "floaterNotification",
  initialState: initialFloaterNotificationState,
  reducers: {
    DispatchFloaterNotification: (state, action: PayloadAction<{ message: string, severity: FloaterNotificationSeverity }>) => {
      state.message = action.payload.message;
      state.severity = action.payload.severity;
      state.show = true;
    },
    CloseFloaterNotification: (state) => {
      state.show = false;
    }
  }
});

export const { DispatchFloaterNotification, CloseFloaterNotification } = floaterNotificationSlice.actions;

export default floaterNotificationSlice.reducer;
