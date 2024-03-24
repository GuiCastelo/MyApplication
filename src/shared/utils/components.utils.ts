import { CloseFloaterNotification, DispatchFloaterNotification } from "../reducers/floater-notification.reducer";
import { FloaterNotificationSeverity } from "../types";

export const createFloaterNotification = (
  message: string,
  severity: FloaterNotificationSeverity
) => (dispatch: any) => {
  dispatch(CloseFloaterNotification());
  setTimeout(() => dispatch(DispatchFloaterNotification({ message, severity })), 0);
}