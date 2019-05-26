import { LOADING_CREATE, CREATE_SUCCESS, CREATE_ERROR } from "./NewPollsConstants";
import { notification } from "antd";
import { history } from "../util/Helpers";

var initialState={
    isLoading:false,
    success:false,
    error:false
}
export const newPollReducer=(state=initialState,action)=>{
    switch (action.type) {
        case LOADING_CREATE:
            return {
                ...state,
                isLoading:true
            }
        case CREATE_SUCCESS:{
            notification.success({
                message: 'Polling App',
            description: 'Create success',
            })
            return {
                ...state,
                isLoading:false,
                success:true
            }
        }
        case CREATE_ERROR:{
            notification.success({
                message: 'Polling App',
            description: 'Create error',
            })
            return {
                ...state,
                isLoading:false,
                error:true,
                success:false
            }
        }
     
        default:
            return state;
    }
}