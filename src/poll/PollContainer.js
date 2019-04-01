import { connect } from "react-redux";
import Poll from "./Poll";
const mapStateToProps = (state) => ({
    voteing:state.pollListReducer.beginsubmit
})

const mapDispatchToProps =dispatch=> {
  return {
    
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Poll);
