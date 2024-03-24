import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { FloaterNotificationInterface } from "../../interfaces/floater-notification.interface";
import { CloseFloaterNotification } from "../../reducers/floater-notification.reducer";
import "./MyAppFloaterNotification.scss";

function MyAppFloaterNotification() {
  const dispatch = useAppDispatch();

  const floaterNotificationState: FloaterNotificationInterface = useAppSelector((state) => state.floaterNotification);

  return (
    <Snackbar 
      open={floaterNotificationState.show}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={floaterNotificationState.timeout}
      onClose={() => dispatch(CloseFloaterNotification())}
    >
      <Alert variant="filled" severity={floaterNotificationState.severity} onClose={() => dispatch(CloseFloaterNotification())}>
        {floaterNotificationState.message}
      </Alert>
    </Snackbar>
  );
};

export default MyAppFloaterNotification;