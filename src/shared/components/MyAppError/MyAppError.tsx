import MyAppButton from "../MyAppButton/MyAppButton";
import ErrorIcon from '@mui/icons-material/Error';
import "./MyAppError.scss";
import { ReactNode } from "react";

function MyAppError(props: {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
  children: ReactNode
}) {
  return (
    <div className="error">
      <ErrorIcon color="error" fontSize="large"></ErrorIcon>
      <p style={{ textAlign: "center", color: "white", margin: "0" }}>{props.children}</p>
      <MyAppButton onClick={props.onClick} size="small">Tentar novamente</MyAppButton>
    </div>
  );
};

export default MyAppError;