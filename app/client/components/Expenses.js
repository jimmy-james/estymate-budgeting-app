import React from 'react';
import { Link } from 'react-router';
import { Button, ControlId, Form, FormControl, FormGroup, Modal, Panel, Table } from 'react-bootstrap';
import CSVDrop from './CSVDrop';
import ExpenseChart from './ExpenseChart';
import ExpenseNode from './ExpenseNode';
import NavBar from './NavBar';

const Expenses = React.createClass({

  getInitialState: function() {
    var proj = null;

    this.props.projects.forEach((project) => {
      if (project.projId === this.props.expenses.projId) {
        proj = project;
        return;
      }
    });
    return {
      open: false,
      expenses: this.props.expenses.expenses,
      projId: this.props.expenses.projId,
      count: 0,
      addedExpenses: [0],
      newExpenses: [],
      modal: false,
      newView: false,
      proj: proj
    };
  },

  componentWillReceiveProps: function(newProps){
    this.setState({newView: true})
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    console.log('the next props are ', nextProps)
    return nextState.newView;
  },

  handleNewExpense: function(singleExpense){
    singleExpense.projs_id = this.state.projId;
    var newExpenses = this.state.newExpenses;
    newExpenses.push(singleExpense);
    this.setState({newExpenses: newExpenses})
    console.log('Handle NEW Expense ', singleExpense);
    this.props.postNewExpense(singleExpense);
  },

  handleExpenseToDelete: function(singleExpense){
    singleExpense.projs_id = this.state.projId;
    console.log('Handle DELETE ', singleExpense);
    this.props.removeExpense(singleExpense);
  },

  handleExpenseUpdate: function(singleExpense){
    singleExpense.projs_id = this.state.projId;
    console.log('Handle UPDATE ', singleExpense);
    this.props.updateExpense(singleExpense);
  },

  switchModal () {
    this.setState({newView: true, modal: !this.state.modal});
  },

  switchChart() {
    console.log('switching chart', !this.state.open)
    this.setState({newView: true, open: !this.state.open});
  },

  render() {
    var proj = null;

    this.props.projects.forEach((project) => {
      if (project.projId === this.props.expenses.projId) {
        proj = project;
        return;
      }
    });

    return (
      <div>
        <Modal show={this.state.modal} onHide={this.switchModal} >
          <Modal.Header>
            <Modal.Title>{"Add Expenses to '" + proj.name + "' with a CSV"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CSVDrop {...this.props}/>
          </Modal.Body>
          <Modal.Footer />
        </Modal>
        <NavBar {...this.props}/>
        <Panel>
          <span style={{"font-size":"30"}}>{"Project Details for " + proj.name }</span>
          <Button bsStyle="primary" style={{"float":"right"}} onClick={this.switchChart}>Toggle Visuals</Button>
          <div style={{"margin-top":"20px"}}>
            <Table striped>
              <thead>
                <tr id="readOnlyHeader">
                  <th>Project ID</th>
                  <th>Vertical</th>
                  <th>Tier</th>
                  <th>Type</th>
                  <th>Number of Assets</th>
                  <th>Status</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Edit Date</th>
                  <th>Release Date</th>
                  <th>Cost to Date</th>
                  <th>Estimate to Complete</th>
                  <th>Requested Budget</th>
                </tr>
              </thead>
              <tbody>
                <tr id="readOnlyBody">
                  <td>{this.state.proj.this.state.projId}</td>
                  <td>{this.state.proj.vertical}</td>
                  <td>{this.state.proj.tier}</td>
                  <td>{this.state.proj.type}</td>
                  <td>{this.state.proj.numAssets}</td>
                  <td>{this.state.proj.status}</td>
                  <td>{this.state.proj.startDate.slice(0,10)}</td>
                  <td>{this.state.proj.endDate.slice(0,10)}</td>
                  <td>{this.state.proj.editDate.slice(0,10)}</td>
                  <td>{this.state.proj.releaseDate.slice(0,10)}</td>
                  <td>{this.state.proj.costToDate}</td>
                  <td>{this.state.proj.estimateToComplete}</td>
                  <td>{this.state.proj.reqBudget}</td>
                </tr>
              </tbody>
            </Table>
          </div>
          {this.state.open ? <ExpenseChart {...this.props} projName={this.state.proj.name}/> : null}
        </Panel>
        <Panel>
          <span style={{"font-size":"30"}}>{"Expenses for " + this.state.proj.name }</span>
          <Button onClick={this.switchModal} style={{"float":"right"}} bsStyle="primary">Add Expenses with a CSV</Button>
          <Table>
            <thead>
              <tr id="readOnlyHeader">
                <th>Vendor</th>
                <th>Description</th>
                <th>Cost</th>
                <th>Method</th>
                <th>Expense Category</th>
                <th>GL Code</th>
                <th>Date Spent</th>
                <th>Date Tracked</th>
              </tr>
            </thead>
              <tbody>
                {this.props.expenses.expenses.map((item, index) =>
                  <ExpenseNode expense={item}
                    handleExpenseToDelete={this.handleExpenseToDelete}
                    handleExpenseUpdate={this.handleExpenseUpdate}
                    projs_id={this.state.projs_id}
                    key={index}
                    readOnlyStatus={true} />)
                }
              </tbody>
          </Table>
          <Panel>
            <Table>
              <thead>
                <tr>
                  <th>Vendor</th>
                  <th>Description</th>
                  <th>Cost</th>
                  <th>Method</th>
                  <th>Expense Category</th>
                  <th>GL Code</th>
                  <th>Date Spent</th>
                  <th>Date Tracked</th>
                </tr>
              </thead>
              <tbody>
                {this.state.addedExpenses.map((item, index) =>
                  <ExpenseNode
                    expense={item}
                    handleNewExpense={this.handleNewExpense}
                    key={index}
                    projs_id={this.state.projs_id}
                    readOnlyStatus={false}/>)
                }
              </tbody>
            </Table>
          </Panel>
        </Panel>
      </div>
    );
  }
});

export default Expenses;
