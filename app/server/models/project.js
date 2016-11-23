var Bookshelf = require('../db.js');
<<<<<<< HEAD
var Organization = require('./organization.js');
var Expense = require('./expense.js');
=======
require('./expense.js');
require('./organization.js');
require('./project.js');
require('./budget.js');
>>>>>>> dev

var Project = Bookshelf.Model.extend({
	tableName: 'projects',
	expenses: function() {
		return this.hasMany(Expense)
	},
	budgets: function() {
		return this.hasMany('Budget', 'projs_id');
	},
	org: function() {
<<<<<<< HEAD
		return this.belongsTo(Organization);
=======
		return this.belongsTo('Organization', 'orgs_id');
	},
	users: function() {
		return this.belongsToMany('Project', 'projs_users', 'projs_id', 'users_id');
>>>>>>> dev
	}
});

<<<<<<< HEAD
module.exports = Project;
=======
module.exports = Bookshelf.model('Project', Project);
>>>>>>> dev
