import { connect } from 'react-redux'
import { logOut } from '../user/login/action';
import AppHeader from './AppHeader';
const mapStateToProps = (state) => ({
    login:state.loginReducer
})

const mapDispatchToProps =dispatch=> {
    return {
        onLogout:()=>dispatch(logOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader)
