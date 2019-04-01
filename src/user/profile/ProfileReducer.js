import { LOAD_USER_PROFLE_SUCCESS, USER_NOT_FOUND, SERVER_ERROR, LOADING } from "./ProfileConstants";

var initialState={
    user:null,
    isLoading:false,
    notFound:false,
    serverError:false
}
export const profileReducer=(state=initialState,action)=>{
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                isLoading:true
            }
        case LOAD_USER_PROFLE_SUCCESS:{
            return {
                ...state,
                isLoading:false,
                user:action.payload
            }
        }
        case USER_NOT_FOUND:{
            return {
                ...state,
                isLoading:false,
                notFound:true
            }
        }
        case SERVER_ERROR:{
            return {
                ...state,
                isLoading:false,
                serverError:true
            }
        }
        default:
            return state;
    }
}