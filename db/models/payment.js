"use strict";
module.exports = (sequelize, DataTypes) => {
	const Payment = sequelize.define(
		"Payment",
		{
			payerId: DataTypes.STRING,
			userId: DataTypes.INTEGER,
			emailAddress: DataTypes.STRING,
			amount: DataTypes.STRING,
			currentcyCode: DataTypes.STRING,
			payerName: DataTypes.STRING,
			alreadyPaid: DataTypes.BOOLEAN,
		},
		{}
	);
	Payment.associate = function (models) {
		Payment.belongsTo(models.User, { foreignKey: "userId" });
	};
	return Payment;
};
