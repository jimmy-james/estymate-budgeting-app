
var Bookshelf = require('../db.js');
<<<<<<< HEAD
var Organization = require('./organization.js');
=======
require('./organization.js');
require('./project.js');
>>>>>>> dev

var User = Bookshelf.Model.extend({
  tableName: 'users',
	org: function() {
<<<<<<< HEAD
		return this.belongsTo(Organization);
	}
});

module.exports = User;
=======
		return this.belongsTo('Organization', 'orgs_id');
	},
	projects: function() {
		return this.belongsToMany('Project', 'projs_users', 'users_id', 'projs_id');
	}
});

module.exports = Bookshelf.model('User', User);
>>>>>>> dev
