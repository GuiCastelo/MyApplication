import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./Users.scss";
import variables from "../../../shared/styles/variables.module.scss";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { deleteUser, getUsers } from "../../../shared/services/user.service";
import MyAppLoader from "../../../shared/components/MyAppLoader/MyAppLoader";
import MyAppButton from "../../../shared/components/MyAppButton/MyAppButton";
import MyAppError from "../../../shared/components/MyAppError/MyAppError";
import { ResetDeleteUserState } from "../../../shared/reducers/user.reducer";
import { createFloaterNotification } from "../../../shared/utils/components.utils";

function Users() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.get);
  const deleteUserState = useAppSelector((state) => state.users.delete);

  useEffect(() => {
    if(deleteUserState.status === "succeded") {
      dispatch(createFloaterNotification(
        "Usuário deletado com sucesso!",
        "success"
      ));
    }

    if(deleteUserState.status === "failed") {
      dispatch(createFloaterNotification(
        "Houve um erro para deletar o usuário. Tente novamente mais tarde",
        "error"
      ));
    }

    dispatch(getUsers());
  }, [dispatch, deleteUserState.status]);

    // Effect when component will unmount
    useEffect(() => () => {
      dispatch(ResetDeleteUserState());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  const handleDeleteUser = (userId: number) => {
    dispatch(deleteUser(userId));
  };

  return (
    <section className="users">
      <h2>Gerenciamento de usuários</h2>

      {users.error === null &&
      <div className="users__table">
        <div className="table__actions">
          <MyAppButton
            onClick={() => navigate("./new")}
            size="small"
          >
            Adicionar Usuário
          </MyAppButton>
        </div>
        {users.data.length > 0 && (
        <TableContainer>
          <Table className="table" sx={{ margin: "0 auto" }}>
            <TableHead className="table__head">
              <TableRow>
                <TableCell align="center"><strong>Usuário</strong></TableCell>
                <TableCell align="center"><strong>Email</strong></TableCell>
                <TableCell align="center"><strong>Senha</strong></TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="table__body">
              {users.data.map((user, index) => (
              <TableRow key={index}>
                <TableCell align="center"><strong className="table__row">{user.username}</strong></TableCell>
                <TableCell align="center"><strong className="table__row">{user.email}</strong></TableCell>
                <TableCell align="center"><strong className="table__row">{user.password}</strong></TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => navigate(`./${user.id}`)}>
                    <EditIcon htmlColor={variables["contrast-color--inverse"]}></EditIcon>
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleDeleteUser(user.id)}>
                    <DeleteIcon htmlColor={variables["contrast-color--inverse"]}></DeleteIcon>
                  </IconButton>
                </TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        )}
        {users.data.length === 0 &&
        <h3>Nenhum cliente cadastrado</h3>
        }
      </div>
      }
      {users.error !== null &&
      <MyAppError onClick={() => dispatch(getUsers())}>Houve um erro para listar os usuários cadastrados. Tente novamente mais tarde</MyAppError>
      }
      {(users.status === "loading" || deleteUserState.status === "loading") && <MyAppLoader></MyAppLoader>}
    </section>
  );
};

export default Users;
