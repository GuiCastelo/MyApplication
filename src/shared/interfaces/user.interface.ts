export interface UserInterface {
  id: number,
  username: string,
  email: string,
  password: string,
  createdAt: Date
}

export interface UserRequestInterface {
  username: string,
  email: string,
  password: string
}