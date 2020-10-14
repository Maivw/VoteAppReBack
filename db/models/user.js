"use strict";
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"User",
		{
			username: DataTypes.STRING,
			email: DataTypes.STRING,
			picture: DataTypes.STRING,
			alreadyPaid: DataTypes.BOOLEAN,
		},
		{}
	);
	User.associate = function (models) {
		User.hasMany(models.Form, { foreignKey: "userId" });
		User.hasMany(models.Payment, { foreignKey: "userId" });
	};
	return User;
};
