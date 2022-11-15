import { UserActionCreator } from "./user/actions";
import { ChatActionCreator } from "./chat/actions";

export const ActionCreators = {...UserActionCreator, ...ChatActionCreator};