import React from 'react';
import { Link } from 'react-router';

import { Form, FormControl, FormGroup, ControlLabel, Button,
        InputGroup, Tabs, Tab } from 'react-bootstrap';

import Budget from "./Budget";
import PitchSummary from "./PitchSummary";

const Pitch = React.createClass({
  getInitialState() {
    var now = new Date(),//just formatting the date as yyyy-mm-dd
        m = now.getMonth() < 10 ? "0" + now.getMonth() : now.getMonth(),
        d = now.getDate() < 10 ? "0" + now.getDate() : now.getDate(),
        date = [now.getFullYear(), m, d];
    const { data } = this.props;
    console.log("data is ", data);
    return {
      activeTab: 1,
      projName: data.name || "",
      projId: data.id || null,
      numAssets: data.numAssets || "",
      videoType: data.type || "",
      reqBudget: data.reqBudget || "",
      studioNeeds: data.needs || "",
      startDate: data.startDate ? data.startDate.split("T")[0] : date.join("-"),
      endDate: data.endDate ? data.endDate.split("T")[0] : date.join("-")
    };
  },
  handleSelect(key) {
    this.setState({activeTab: key});
  },
  tabToBudget() {
    console.log("ding ding ding");
    this.setState({activeTab: 2});
  },
  render() {
    return (
      <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect} id="test-tabs">
        <Tab eventKey={1} title="Pitch">{<PitchSummary {...this.props}
            data={this.state} tabToBudget={this.tabToBudget}/>}</Tab>
        <Tab eventKey={2} title="Budget">{<Budget {...this.props} total={this.state.reqBudget}/>}</Tab>
      </Tabs>
    );
  }
});
export default Pitch;
