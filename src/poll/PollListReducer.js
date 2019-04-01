import { LOADING, LOAD_ERROR, LOAD_POLLS_SUCCESS, VOTE_CHANGE, BEGINNING_SUBMIT, VOTE_SUBMIT_SUCCESS, LOGOUTED, ERROR, RESET } from "./PollConstants";
import { notification } from "antd";

const initialState={
    polls: [],
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
    last: true,
    currentVotes: [],
    isLoading: false,
    error:false,
    beginsubmit:false,
    isLogout:null,
    errorSubmit:false,
}
export const pollListReducer=(state=initialState,action)=>{
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                isLoading:true
            }
        case LOAD_ERROR:{
            return{
                ...state,
                isLoading:false,
                error:true
            }
        }
        case LOAD_POLLS_SUCCESS:{
            
            const polls = state.polls.slice();
            const currentVotes = state.currentVotes.slice();   
            if(state.page===0){
                return {
                    ...state,
                    polls: action.payload.content,
                    page: action.payload.page,
                    size: action.payload.size,
                    totalElements: action.payload.totalElements,
                    totalPages: action.payload.totalPages,
                    last: action.payload.last,
                    currentVotes: Array(action.payload.content.length).fill(null),
                    isLoading: false,
                    error:false,
                    beginsubmit:false,
                    isLogout:null
                }
            }         
            return {
                ...state,
                polls: polls.concat(action.payload.content),
                page: action.payload.page,
                size: action.payload.size,
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
                last: action.payload.last,
                currentVotes: currentVotes.concat(Array(action.payload.content.length).fill(null)),
                isLoading: false,
                error:false,
                beginsubmit:false,
                isLogout:null
            }
        }
        case VOTE_CHANGE:{
            return {
                ...state,
                currentVotes: action.payload
            }
        }
        case BEGINNING_SUBMIT:{
            return {
                ...state,
                beginsubmit:true
            }
        }
        case VOTE_SUBMIT_SUCCESS:{
            const polls =state.polls.slice();
            polls[action.payload.index] = action.payload.poll;
            return {
                ...state,
                polls:polls,
                beginsubmit:false
            }
        }
        case LOGOUTED:{
            notification.error({
                message: 'Polling App',
                description: 'You have been logged out. Please login to vote'
            });   
            return {
                ...state,
                isLogout:true,
                beginsubmit:false
            }
        }
        case ERROR:{
            notification.error({
                message: 'Polling App',
                description: 'Sorry! Something went wrong. Please try again!'
            });  
            return {
                ...state,
                beginsubmit:false,
                errorSubmit:true
            }
        }
        case RESET:{
            return initialState
        }
        default:
           return state
    }
} 
