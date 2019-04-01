import { LOGINING, LOGIN_SUCCESSFULLY, LOGIN_FAILED, LOADING_CURRENT_USER, LOADING_CURRENT_USER_SUCCESS, ERRORBASE, LOG_OUT } from "./constant";
import { notification } from 'antd';
import { ACCESS_TOKEN } from "../../constants";

var initialState={
    loading:false,
    currentUser:null,
    authenticated:false,
    loginfalse:null,
    error:false
}
export const loginReducer=(state=initialState,action)=>{
    switch (action.type) {
        case LOGINING:        
            return {
                ...state,loading:true
            }
         case LOGIN_SUCCESSFULLY:
         notification.success({
            message: 'Polling App',
            description: 'Login successfully. Waiting to load your profile',
        });
         return {
             ...state,loading:false,
             authenticated:true
         }
         case LOGIN_FAILED:
         notification.error({
            message: 'Polling App',
            description: 'Login failed',
        })
         return{
             ...state,
             loading:false,
             loginfalse:true,
             currentUser:null,
             authenticated:false
         }
         case LOADING_CURRENT_USER:
         return {
             ...state,
             loading:true
         }  
         case LOADING_CURRENT_USER_SUCCESS:         
         return {
             ...state,
             loading:false,
             currentUser:action.payload
         } 
         case ERRORBASE:
         if(localStorage.getItem(ACCESS_TOKEN)){
            notification.error({
                message: 'Polling App',
                description: 'Has error.Sorry',
            })
         }

         return {
             ...state,
             loading:false,
            error:true
         }
         case LOG_OUT:
         notification.success({
            message: 'Polling App',
            description: `You're successfully logged out.`,
          });
            return initialState;
        default:
        return state
    }
}