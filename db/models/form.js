"use strict";
module.exports = (sequelize, DataTypes) => {
	const Form = sequelize.define(
		"Form",
		{
			userId: { type: DataTypes.INTEGER, allowNull: false },
			officeTitle: { type: DataTypes.STRING, allowNull: false },
			candidateName: { type: DataTypes.STRING, allowNull: false },
			district: { type: DataTypes.STRING, allowNull: false },
			address: { type: DataTypes.STRING, allowNull: false },
			occupation: { type: DataTypes.STRING, allowNull: false },
		},
		{}
	);
	Form.associate = function (models) {
		Form.belongsTo(models.User, { foreignKey: "userId" });
	};
	return Form;
};
