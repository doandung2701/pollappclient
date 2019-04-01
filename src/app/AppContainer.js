import {connect} from 'react-redux';
import App from './App';
import { loadCurrentUser } from '../user/login/action';

const mapStateToProps = (state) => ({
  ...state
})

const mapDispatchToProps =dispatch=> {
    return {
      loadCurrentUser:()=>dispatch(loadCurrentUser())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);