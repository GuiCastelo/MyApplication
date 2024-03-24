import { SubmitHandler, useForm, useFormState } from "react-hook-form";
import "./EditUser.scss";
import variables from "../../../shared/styles/variables.module.scss";
import { UserRequestInterface } from "../../../shared/interfaces/user.interface";
import { updateUser } from "../../../shared/services/user.service";
import { createFloaterNotification } from "../../../shared/utils/components.utils";
import { ResetUpdateUserState } from "../../../shared/reducers/user.reducer";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { useEffect } from "react";
import MyAppBreadcrumb from "../../../shared/components/MyAppBreadcrumb/MyAppBreadcrumb";
import TextField from "@mui/material/TextField";
import MyAppButton from "../../../shared/components/MyAppButton/MyAppButton";
import MyAppLoader from "../../../shared/components/MyAppLoader/MyAppLoader";

function EditUser() {
  const id = Number(useParams().id);
  const updateUserState = useAppSelector((state) => state.users.update);
  const users = useAppSelector((state) => state.users.get);
  const user = users.data.find((user) => user.id === id);
  const { register, handleSubmit, control } = useForm<UserRequestInterface>({
    defaultValues: {
      username: user?.username,
      email: user?.email,
      password: user?.password
    }
  });
  const { errors, isDirty, isValid } = useFormState({ control: control });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
		if(updateUserState.status === "succeded") {
			dispatch(createFloaterNotification(
				"Usuário editado com sucesso!",
				"success"
			));
			navigate("/");
			dispatch(ResetUpdateUserState());
		}

    if(updateUserState.status === "failed") {
      dispatch(createFloaterNotification(
				"Houve um erro para editar o usuário. Tente novamente mais tarde",
				"error"
			));
    }
	}, [navigate, updateUserState.status, dispatch]);

  const sendForm: SubmitHandler<UserRequestInterface> = (data: UserRequestInterface) => {
    const submitData: UserRequestInterface = {
      username: data.username.trim(),
      email: data.email.trim(),
      password: data.password.trim()
    };
    dispatch(updateUser(id, submitData));
  };

  return (
    <section className="edit-user">
      <MyAppBreadcrumb routes={[
					{ label: "Início", route: "/" },
					{ label: "Editar Usuário", route: `/${id}` }
				]}></MyAppBreadcrumb>
        <form className="form" onSubmit={handleSubmit(sendForm)}>
					<h2 style={{ color: variables["text-color--inverse"], textAlign: "center" }}>Editar Usuário</h2>
					<div className="form__field">
						<TextField fullWidth autoComplete="off" margin="none" label="Username*" variant="standard" {...register("username", { required: "Este campo é obrigatório" })} />
						{errors.username && <p className="form__field--error">{errors.username.message}</p>}
					</div>
					<div className="form__field">
						<TextField fullWidth autoComplete="off" margin="none" label="Email*" variant="standard" {...register("email", { required: "Este campo é obrigatório" })} />
						{errors.email && <p className="form__field--error">{errors.email.message}</p>}
					</div>
					<div className="form__field">
						<TextField fullWidth autoComplete="off" margin="none" label="Password*" variant="standard" {...register("password", { required: "Este campo é obrigatório" })} />
						{errors.password && <p className="form__field--error">{errors.password.message}</p>}
					</div>
					<div style={{ display: "flex", justifyContent: "center" }}>
						<MyAppButton disabled={!isDirty && !isValid} type="submit" size="small">Editar</MyAppButton>
					</div>
        </form>
        {updateUserState.status === "loading" && <MyAppLoader></MyAppLoader>}
    </section>
  );
};

export default EditUser;