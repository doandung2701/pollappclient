import { LOADING, LOAD_USER_PROFLE_SUCCESS, USER_NOT_FOUND, SERVER_ERROR } from "./ProfileConstants";
import { getUserProfile } from "../../util/APIUtils";

export const loading=()=>({
    type:LOADING
})
export const loadUserProfile=(username)=>{    
    return dispatch=>{
        dispatch(loading())
        getUserProfile(username)
        .then(response=>{            
            dispatch(loadUserProfileSuccess(response))
        }).catch(error=>{
            if(error.status===404){
                dispatch(UserNotFound())
            }else{
                dispatch(ServerError())
            }
        })
    }
}
export const loadUserProfileSuccess=(reponse)=>({
    type:LOAD_USER_PROFLE_SUCCESS,
    payload:reponse
})
export const UserNotFound=()=>({
    type:USER_NOT_FOUND
})
export const ServerError=()=>({
    type:SERVER_ERROR
})
