var Expense = require('./controllers/expenseController.js');
var Organization = require('./controllers/organizationController.js');
var Project = require('./controllers/projectController.js');
var ProjUser = require('./models/projUser.js');
var User = require('./controllers/userController.js');


module.exports = function routes(app){
  app.post('/api/register/org', function(req, res){
    //makes organization w/ name req.body.orgName and returns the organization model
    //if an org with that name already exists return a 403
    Organization.getOrg(req.body.orgName, function(org) {
      if (!org) {
        Organization.makeOrg({name: req.body.orgName}, function(org){ 
          org ? res.status(200).json(org) : res.sendStatus(404);
        });
      } else {
        res.sendStatus(403);
      }
    });  
  });

  app.post('/api/register/user', function(req, res){
    //makes username w/ name req.body.username, req.body.password, req.body.perm, and req.body.orgs_id and returns the user model
    //if a user with that username already exists return a 403
    //req.body should be
    // {
    //   data :{
    //       username: string,
    //       password: string,
    //       perm: int,
    //       orgs_id: int
    //   }
    // }
    User.getUser(req.body.data.username, function(user) {
      if (!user) {
        User.makeUser(req.body.data, function(user){ 
          user ? res.status(200).json(user) : res.sendStatus(404);
        });
      } else {
        res.sendStatus(403);
      }
    });
  });

  app.post('/api/register/project', function(req, res) {
    //req body should hold the following 
    // { 
      // data: {
      //  name: string,
      //  projId: string,
      //  type: string,
      //  reqBudget: float,
      //  needs: string,
      //  shootDates: string,
      //  status: string,
      //  costToDate: float,
      //  estimateToComplete: float,
      //  orgs_id: int
      // }
    //  users_ids: [int1, int2, int3...]  <-- this is optional
    // }
    // 
    // makes a project w/ the provided data which is linked to the organization
    // and users described by the id values, then returns it
    Project.makeProj(req.body.data, function(proj) {
      proj ? res.status(200).json(proj) : res.sendStatus(404);
    });
  });

  app.post('/api/register/expenses', function(req, res) {
    // req body should hold the following 
    // {
    //  data: {
    //    type: string,
    //    vertical: string,
    //    category: string,
    //    glCode: string,
    //    dateSpent: string,
    //    dateTracked: string,
    //    vendor: string,
    //    method: string,
    //    description: string,
    //    cost: float,
    //    projs_id: int
    //  }   
    // }

    // makes an expense w/ the provided data linked to the provided project
    // returns it on completion
    Expense.makeExpense(req.body.data, function(exp) {
      exp ? res.status(200).json(exp) : res.sendStatus(404);
    });
  });

  app.post('/api/get/org', function(req, res) {
    // input: req.body.orgName
    // outpout: org w/ attached users and projects || 404
    Organization.getOrg(req.body.orgName, function(org) {
      org ? res.status(200).json(org) : res.sendStatus(404);

    })
  });

  app.post('/api/get/user', function(req, res) {
    // input: req.body.username
    // output: user w/ attached org and projects || 404
    User.getUser(req.body.username, function(user) {
      user ? res.status(200).json(user) : res.sendStatus(404);
    })
  });

  app.post('/api/get/proj', function(req, res) {
    // input: req.body.projId
    //  output: proj w/ attached expenses, users, and org || 404
    Project.getProj(req.body.projId, function(proj) {
      proj ? res.status(200).json(proj) : res.sendStatus(404);
    })
  });

  app.post('api/proj/users', function(req, res) {
    //expects an object of {projs_id:users_id} key/value pairs in an object under req.body.data
    var len = Object.keys(req.body.data).length;
    var count = 0;
    for (var key in req.body.data) {
      new ProjKey({projs_id: key + 0, users_id: req.body.data[key] + 0}).save().then(function(){
        count++;
        if (count === len - 1) {
          res.sendStatus(200);
        }
      });
    }


  })
};
