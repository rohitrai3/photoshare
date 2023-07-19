import { FeedbackStatus } from "./enums";

export type GoogleUserData = {
  uid: string;
  name: string;
  photoUrl: string;
};

export type UserInfo = {
  uid: string;
  username: string;
  name: string;
  photoUrl: string;
};

export type PostData = {
  uid: string;
  username: string;
  photoUrl: string;
  caption: string;
  timestamp: number;
};

export type CommentData = {
  uid: string;
  username: string;
  comment: string;
  timestamp: number;
};

export type CommentDataWithUserInfo = {
  comment: CommentData;
  user: UserInfo;
};

export type FeedbackData = {
  uid: string;
  message: string;
  status: FeedbackStatus;
  timestamp: number;
};
