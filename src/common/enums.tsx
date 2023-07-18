export enum UserType {
  NEW = "new",
  EXISTING = "existing",
}

export enum ErrorMessage {
  USER_EXIST = "User already exist. Please sign in as existing user.",
  USER_NOT_EXIST = "User does not exist. Please sign in as new user.",
  USERNAME_TAKEN = "Username already taken. Please try different username.",
}

export enum NavigationSection {
  HOME,
  ADD_POST,
  CONTACTS,
  USER,
}

export enum ContactTab {
  MY,
  ADD,
}
