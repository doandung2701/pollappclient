import { connect } from "react-redux";
import Profile from "./Profile";
import { loadUserProfile } from "./ProfileActions";
const mapStateToProps = (state) => ({
    isAuthenticated:state.loginReducer.isAuthenticated,
     currentUser:state.loginReducer.currentUser,
     profile:state.profileReducer
})

const mapDispatchToProps =dispatch =>{
  return{
      loadUserProfile:(username)=>dispatch(loadUserProfile(username))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Profile);
