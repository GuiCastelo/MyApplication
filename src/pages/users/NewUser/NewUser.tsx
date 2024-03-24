import { useNavigate } from "react-router-dom";
import MyAppBreadcrumb from "../../../shared/components/MyAppBreadcrumb/MyAppBreadcrumb";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import "./NewUser.scss";
import variables from "../../../shared/styles/variables.module.scss";
import { SubmitHandler, useForm, useFormState } from "react-hook-form";
import { UserRequestInterface } from "../../../shared/interfaces/user.interface";
import { createUser } from "../../../shared/services/user.service";
import { ResetCreateUserState } from "../../../shared/reducers/user.reducer";
import { createFloaterNotification } from "../../../shared/utils/components.utils";
import { useEffect } from "react";
import TextField from "@mui/material/TextField";
import MyAppButton from "../../../shared/components/MyAppButton/MyAppButton";
import MyAppLoader from "../../../shared/components/MyAppLoader/MyAppLoader";

function NewUser() {
  const { register, handleSubmit, control } = useForm<UserRequestInterface>();
  const { errors, isValid } = useFormState({ control: control });
  const createUserState = useAppSelector((state) => state.users.create);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
		if(createUserState.status === "succeded") {
			dispatch(createFloaterNotification(
				"Usuário criado com sucesso!",
				"success"
			));
			navigate("/");
			dispatch(ResetCreateUserState());
		}

    if(createUserState.status === "failed") {
      dispatch(createFloaterNotification(
				"Houve um erro para criar o usuário. Tente novamente mais tarde",
				"error"
			));
    }
	}, [navigate, createUserState.status, dispatch]);

  const sendForm: SubmitHandler<UserRequestInterface> = (data: UserRequestInterface) => {
    const submitData: UserRequestInterface = {
      username: data.username.trim(),
      email: data.email.trim(),
      password: data.password.trim()
    };
    dispatch(createUser(submitData));
  };

  return (
    <section className="new-user">
      <MyAppBreadcrumb routes={[
					{ label: "Início", route: "/" },
					{ label: "Adicionar Usuário", route: "/new" }
				]}></MyAppBreadcrumb>
        <form className="form" onSubmit={handleSubmit(sendForm)}>
					<h2 style={{ color: variables["text-color--inverse"], textAlign: "center" }}>Adicionar Usuário</h2>
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
						<MyAppButton disabled={!isValid} type="submit" size="small">Adicionar</MyAppButton>
					</div>
        </form>
        {createUserState.status === "loading" && <MyAppLoader></MyAppLoader>}
    </section>
  );
};

export default NewUser;
