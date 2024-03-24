import CircularProgress from "@mui/material/CircularProgress";
import "./MyAppLoader.scss";

function MyAppLoader() {
  return (
    <div className="loader">
      <CircularProgress className="loader__circle"></CircularProgress>
    </div>
  );
}

export default MyAppLoader;