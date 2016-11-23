import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Main from './Main.js';

function mapStateToProps(state) {
  return {
    organization: state.organization,
    projects: state.projects,
    budgets: state.budgets,
    expenses: state.expenses,
    messages: state.messages,
    modals: state.modals,
    navBar: state.navBar,
    csv: state.parseCSV
  };
}

//does a bit of magic, not entirely clear on what this does yet
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

//adds all of the props and data from state to props
// adds all of the action creators to props as well.
const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;
