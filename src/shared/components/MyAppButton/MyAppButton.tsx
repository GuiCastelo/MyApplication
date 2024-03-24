import Button from "@mui/material/Button";
import { ReactNode } from "react";
import "./MyAppButton.scss";

function MyAppButton(props: {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
  type?: "button" | "submit" | "reset" | undefined
  disabled?: boolean | undefined
  size: "small" | "medium" | "large",
  children: ReactNode
}) {
  return (
    <Button onClick={props.onClick} disabled={props.disabled} type={props.type} variant="contained" size={props.size} className={props.disabled ? "button--disabled" : "button"}>
      {props.children}
    </Button>
  );
};

export default MyAppButton;