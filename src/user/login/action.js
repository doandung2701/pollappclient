import { LOGINING, LOGIN_SUCCESSFULLY, LOGIN_FAILED, LOADING_CURRENT_USER, LOADING_CURRENT_USER_SUCCESS, ERRORBASE, LOG_OUT } from "./constant";
import { login, getCurrentUser } from "../../util/APIUtils";
import { ACCESS_TOKEN } from "../../constants";

export const LogingIn=()=>({
    type:LOGINING
})
export const loginSuccessFully=()=>({
    type: LOGIN_SUCCESSFULLY
})

export const loginFailed = ()=>({
    type: LOGIN_FAILED
})
//load user
export const LoadUserIn=()=>({
    type:LOADING_CURRENT_USER
})
export const loadCurrentUserSuccess=(response)=>({
    type:LOADING_CURRENT_USER_SUCCESS ,
    payload:response,
})
export const onError=(status)=>{
    if(status===401){
        return {
            type:LOGIN_FAILED
        }
    }else{
        return {
            type:ERRORBASE
        }
    }
}
export const logOut=()=>{
    localStorage.removeItem(ACCESS_TOKEN);
    return dispatch=>{
        dispatch(logOutSuccess())
    }
}
export const logOutSuccess=()=>({
    type:LOG_OUT
})
export const loginUser=(loginRequest)=>{
    return dispatch=>{
        dispatch(LogingIn())
        login(loginRequest)
        .then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
           dispatch(loginSuccessFully())
            dispatch(loadCurrentUser())
        }).catch(error => {
            dispatch(onError(error.status))            
        });
    }
}
export const loadCurrentUser=()=>{
    return dispatch=>{
        dispatch(LoadUserIn())
        getCurrentUser()
        .then(response => {            
            dispatch(loadCurrentUserSuccess(response));
          }).catch(error => {
            dispatch(onError(error.status))
          });
    }
}
