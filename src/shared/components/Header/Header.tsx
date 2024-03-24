import { Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import './Header.scss';
import variables from "../../styles/variables.module.scss";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from '@mui/icons-material/Search';

function Header() {
  return (
    <header className="header">
      <Link to={'/'} style={{ justifySelf: "center" }}>
        <HomeIcon fontSize="large" htmlColor={variables["contrast-color"]}></HomeIcon>
      </Link>
      <div className="header__search-bar">
        <Input
          className="header__search"
          id="searchUserInput"
          placeholder="Busca por nome de usuário"
          startAdornment={
            <InputAdornment position="end">
              <SearchIcon/>
            </InputAdornment>
          }
        />
      </div>
      <div className="header__actions">
        <PersonIcon fontSize="large" htmlColor={variables["contrast-color"]}></PersonIcon>
      </div>
    </header>
  );
}

export default Header;