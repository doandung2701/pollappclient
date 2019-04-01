import { LOADING_CREATE, CREATE_SUCCESS, CREATE_ERROR } from "./NewPollsConstants";
import { createPoll } from "../util/APIUtils";

export const ceatePoll=(data)=>{
    return disaptch=>{
        disaptch(biginCreeate())
        createPoll(data).then(response=>{
            disaptch(createSuccess())
        }).catch(error=>{
            disaptch(createError())
        })
    }
}
export const biginCreeate=()=>({
    type:LOADING_CREATE
})
export const createSuccess=()=>({
    type:CREATE_SUCCESS
})
export const createError=()=>({
    type:CREATE_ERROR
})