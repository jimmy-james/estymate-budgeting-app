
var Bookshelf = require('../db.js');
require('./organization.js');

var User = Bookshelf.Model.extend({
  tableName: 'users',
	orgs: function() {
		return this.belongsTo('Organization', 'orgs_id');
	}
});

module.exports = Bookshelf.model('User', User);