"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("Forms", []);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Forms", null, {});
	},
};
