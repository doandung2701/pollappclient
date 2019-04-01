import { combineReducers } from "redux";
import { loginReducer } from "../user/login/reducer";
import { pollListReducer } from "../poll/PollListReducer";
import {profileReducer} from "../user/profile/ProfileReducer";
import { newPollReducer } from "../poll/NewPollReducer";
export const rootReducer=combineReducers({
    loginReducer:loginReducer,
    pollListReducer:pollListReducer,
    profileReducer:profileReducer,
    newPollReducer:newPollReducer
})