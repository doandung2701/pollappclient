import { connect } from 'react-redux'
import { ceatePoll } from './NewPollActions';
import NewPoll from './NewPoll';
const mapStateToProps = (state) => ({
  newPoll:state.newPollReducer
})

const mapDispatchToProps =dispatch=> {
  return {
      createPoll:(data)=>dispatch(ceatePoll(data))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(NewPoll);