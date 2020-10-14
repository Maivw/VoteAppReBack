"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("Payments", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},

			payerId: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			userId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: "Users",
					key: "id",
				},
			},
			emailAddress: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			amount: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			currentcyCode: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			payerName: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			alreadyPaid: {
				type: Sequelize.BOOLEAN,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("Payments");
	},
};
