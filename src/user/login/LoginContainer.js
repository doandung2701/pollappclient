import {connect} from 'react-redux';
import Login from './Login';
import { loginUser, loadCurrentUser } from './action';

const mapStateToProps = (state) => ({
    login:state.loginReducer
})

const mapDispatchToProps =dispatch=> {
   return{
    loginUser:(loginPayload)=>dispatch(loginUser(loginPayload)),
    loadCurrentUser:()=>dispatch(loadCurrentUser())
   } 
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);
