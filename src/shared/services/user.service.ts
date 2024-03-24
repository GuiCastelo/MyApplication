import { UserRequestInterface, UserInterface } from "../interfaces/user.interface";
import { baseService } from "./base.service";

export const getUsersService = baseService<UserInterface[], void>(
  "getUsersService",
);

export const getUsers = () => getUsersService({
  url: "/myapplicationuser/v1/users",
  method: "GET"
});

export const createUserService = baseService<UserInterface, UserRequestInterface>(
  "createUserService",
);

export const createUser = (user: UserRequestInterface) => createUserService({
  url: "/myapplicationuser/v1/user",
  method: "POST",
  body: user
});

export const updateUserService = baseService<UserInterface, UserRequestInterface>(
  "updateUserService",
);

export const updateUser = (id: number, editUser: UserRequestInterface) => updateUserService({
  url: `/myapplicationuser/v1/user/${id}`,
  method: "PUT",
  body: editUser
});

export const deleteUserService = baseService<undefined, void>(
  "deleteUserService",
);

export const deleteUser = (id: number) => deleteUserService({
  url: `/myapplicationuser/v1/user/${id}`,
  method: "DELETE"
});
