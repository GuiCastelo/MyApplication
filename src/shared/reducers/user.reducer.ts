import { combineReducers, createSlice } from "@reduxjs/toolkit";
import { ServiceStateInterface } from "../interfaces/service.interface";
import { UserInterface, UserRequestInterface } from "../interfaces/user.interface";
import { createUserService, deleteUserService, getUsersService, updateUserService } from "../services/user.service";

const usersInitialState: ServiceStateInterface<UserInterface[]> = {
  status: "idle",
  data: [],
  error: null
};

export const getUserSlice = createSlice({
  name: "getUsers",
  initialState: usersInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersService.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getUsersService.fulfilled, (state, action) => {
      state.status = "succeded";
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getUsersService.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
      state.data = [];
    });
  },
});

const createAndUpdateInitialState: ServiceStateInterface<UserRequestInterface> = {
  status: "idle",
  data: { username: "", email: "", password: "" },
  error: null
};

export const createUserSlice = createSlice({
  name: "createUser",
  initialState: createAndUpdateInitialState,
  reducers: {
    ResetCreateUserState: (state) => {
      state.status = "idle";
      state.data = createAndUpdateInitialState.data;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createUserService.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createUserService.fulfilled, (state, action) => {
      state.status = "succeded";
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(createUserService.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
      state.data = createAndUpdateInitialState.data;
    });
  }
});

export const updateUserSlice = createSlice({
  name: "updateUser",
  initialState: createAndUpdateInitialState,
  reducers: {
    ResetUpdateUserState: (state) => {
      state.status = "idle";
      state.data = createAndUpdateInitialState.data;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(updateUserService.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateUserService.fulfilled, (state, action) => {
      state.status = "succeded";
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(updateUserService.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
      state.data = createAndUpdateInitialState.data;
    });
  }
});

const deleteInitialState: ServiceStateInterface<any> = {
  status: "idle",
  data: null,
  error: null
};

export const deleteUserSlice = createSlice({
  name: "deleteUser",
  initialState: deleteInitialState,
  reducers: {
    ResetDeleteUserState: (state) => {
      state.status = "idle";
      state.data = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(deleteUserService.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteUserService.fulfilled, (state, action) => {
      state.status = "succeded";
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(deleteUserService.rejected, (state, action) => {
      console.log(action);
      state.status = "failed";
      state.error = action.payload;
      state.data = deleteInitialState.data;
    });
  }
});

export const { ResetCreateUserState } = createUserSlice.actions;

export const { ResetUpdateUserState } = updateUserSlice.actions;

export const { ResetDeleteUserState } = deleteUserSlice.actions;

export default combineReducers({
  get: getUserSlice.reducer,
  create: createUserSlice.reducer,
  update: updateUserSlice.reducer,
  delete: deleteUserSlice.reducer
});