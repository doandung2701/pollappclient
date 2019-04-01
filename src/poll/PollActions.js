import { LOADING, LOAD_ERROR, LOAD_POLLS_SUCCESS, VOTE_CHANGE, BEGINNING_SUBMIT, VOTE_SUBMIT_SUCCESS, ERROR, LOGOUTED, RESET, LOADING_CAST } from "./PollConstants";
import { getUserCreatedPolls, getUserVotedPolls, getAllPolls, castVote } from "../util/APIUtils";
import { logOut } from "../user/login/action";

export const LoadingPoll=()=>({
    type:LOADING
})
export const LoadingUserCreatedPolls=(data)=>{
    return dispatch=>{
        dispatch(LoadingPoll())
        getUserCreatedPolls(data.username,data.page,data.size).then(response=>{
            dispatch(LoadingPollsSuccess(response));
        }).catch(error=>{
            dispatch(LoadingPollsError(error));
        })
    }
}
export const CastVote=(data)=>{
    return dispatch=>{
        dispatch(LoadingCastVote())
        castVote(data)
        .then(response => {
            dispatch(VoteSubmitSuccess(response));
        }).catch(error => {
           VoteSubmitError(error.status)
        });
    }

}
export const LoadingCastVote=()=>({
        type:BEGINNING_SUBMIT
})
export const LoadingUserVotedPolls=(data)=>{
    return dispatch=>{
        dispatch(LoadingPoll())
        getUserVotedPolls(data.username,data.page,data.size).then(response=>{
            dispatch(LoadingPollsSuccess(response));
        }).catch(error=>{
            dispatch(LoadingPollsError(error));
        })
    }
}
export const LoadingAllPolls=(data)=>{
    return dispatch=>{
        dispatch(LoadingPoll())
        getAllPolls(data.page,data.size).then(response=>{            
            dispatch(LoadingPollsSuccess(response));
        }).catch(error=>{
            dispatch(LoadingPollsError(error));
        })
    }
}
export const LoadingPollsSuccess=response=>{
        return{
            type:LOAD_POLLS_SUCCESS,
            payload:response
        }
}
export const LoadingPollsError=(error)=>{
    return {
        type:LOAD_ERROR
    }
}
export const VoteChange=(data)=>{
    return {
        type:VOTE_CHANGE,
        payload:data
    }   
}
export const BeginingSubmit=()=>({
    type:BEGINNING_SUBMIT
})
export const VoteSubmit=(voteData,pollIndex)=>{
    return dispatch=>{
        dispatch(BeginingSubmit())
        castVote(voteData)
        .then(response=>{
            let data={
                poll:response,
                index:pollIndex
            }
            dispatch(VoteSubmitSuccess(data))
        }).catch(error=>{
            dispatch(VoteSubmitError(error.status))
        })
    }
}
export const VoteSubmitSuccess=(data)=>({
    type:VOTE_SUBMIT_SUCCESS,
    payload:data
})
export const VoteSubmitError=status=>{
    if(status===401){
        return {
            type:LOGOUTED
        }
    }
    return {
        type:ERROR
    }
}
export const reset=()=>({
    type:RESET
})