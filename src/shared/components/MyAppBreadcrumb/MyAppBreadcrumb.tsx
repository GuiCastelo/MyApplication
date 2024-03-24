import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import "./MyAppBreadcrumb.scss";

function MyAppBreadcrumb( props: { routes?: {label: string, route: string}[] } ) {
  return (
    <Breadcrumbs className="breadcrumb">
      {props.routes?.map((route, index) => {
        if(index === 0) {
          return (
            <Link key={index} className="breadcrumb__label" to={route.route}>
              <HomeIcon></HomeIcon>
              {route.label}
            </Link>
          );
        }

        if(index + 1 === props.routes?.length) {
          return <p key={index}>{route.label}</p>;
        }

        return (
          <Link key={index} className="breadcrumb__label" to={route.route}>
            {route.label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}

export default MyAppBreadcrumb;