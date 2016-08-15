import axios from 'axios';

let registrationCheck = (orgName, username) =>
  axios.post('/api/register/check', {orgName, username});

let registerOrg = (orgName) =>
  axios.post('/api/register/org', {orgName});

let registerUser = (username, password, orgs_id, perm) => {
  var data = {username: username, password: password, orgs_id: orgs_id, perm: perm};

  return axios.post('/api/register/user', {data: data});
};

let updateUser = (user) => {
  return axios.post('/api/update/user', {});
};

let registerProject = (projectObj) =>
  axios.post('/api/register/project', {data: projectObj});

let updateProject = (data, projId) =>
  axios.post('/api/update/proj', {data, projId});

let login = (username, password) =>
  axios.post('/api/get/user', {username: username, password: password});

let logout = () =>
  axios.post('/api/get/logout', {});

let changePassword = (username, password) =>
  axios.post('/api/update/user', {username, data: {password}});

let getProjectsByOrgName = (orgName) =>
  axios.post('/api/get/org', {orgName: orgName});

let getProjectByProjId = (projId) =>
  axios.post('/api/get/proj', {projId});

let getExpensesByProjectId = (projectId) =>
  axios.post('/api/get/proj', {projId: projectId});

let registerExpense = (action) => {
  var data = action.singleExpense;
  data.projs_Id = action.projs_Id;
  console.log('in servercalls ', data);
  return axios.post('/api/register/expenses', {data: data});
};

let removeExpense = (action) => {
  console.log('at the sever call ', action);
  var data = action.id;
  return axios.post('/api/remove/expense', {id: data});
};

let updateExpense = (action) => {
  var data = action.data;
  var id = action.data.id;
  console.log('in the server call ', id, 'the data is ', data)
  return axios.post('/api/update/expense', {data: data, id:id});
}

let parseCSV = (data, id) =>
  axios.post('/api/register/csv', {data: data, id: id});

let addBudget = (data, id) =>
  axios.post('/api/register/budget', { data: data, id: id });

let getExpenses = (projIds) =>
  axios.post('/api/get/expenses', { projIds: projIds});

const ApiCall = {
  registrationCheck,
  registerOrg,
  registerUser,
  updateUser,
  registerProject,
  updateProject,
  login,
  logout,
  changePassword,
  getProjectsByOrgName,
  getProjectByProjId,
  getExpensesByProjectId,
  registerExpense,
  removeExpense,
  updateExpense,
  parseCSV,
  addBudget,
  getExpenses
};

export default ApiCall;
