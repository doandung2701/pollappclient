import { connect } from "react-redux";
import PollList from "./PollList";
import { LoadingUserCreatedPolls, LoadingUserVotedPolls, LoadingAllPolls, reset, VoteChange, CastVote, VoteSubmit } from "./PollActions";
const mapStateToProps = (state) => ({
  polls:state.pollListReducer,
  isAuthenticated:state.loginReducer.authenticated
})

const mapDispatchToProps = dispatch=>{
    return {
        loadingUserCreatedPolls:(data)=>dispatch(LoadingUserCreatedPolls(data)),
        loadingUserVotedPolls:(data)=>dispatch(LoadingUserVotedPolls(data)),
        loadingAllPolls:(data)=>dispatch(LoadingAllPolls(data)),
        reset:()=>dispatch(reset()),
        VoteChange:(data)=>dispatch(VoteChange(data)),
        castVote:(data,pollIndex)=>dispatch(VoteSubmit(data,pollIndex))

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(PollList);