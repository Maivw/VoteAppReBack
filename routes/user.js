const express = require("express");
const bcrypt = require("bcryptjs");
const checkJwt = require("../authO").checkJwt;
const { check } = require("express-validator");
const {
	asyncHandler,
	handleValidationErrors,
	validatePassword,
} = require("../utils");
const { getUserToken, requireAuth } = require("../auth");
const db = require("../db/models");

const { User, Form, Payment } = db;
const router = express.Router();
const userNotFound = (userId) => {
	const err = new Error("User not found");
	err.errors = [`User with id: ${userId} could not be found.`];
	err.title = "User not found.";
	err.status = 404;
	return err;
};

const validateLoginInfo = [
	check("email")
		.exists({ checkFalsy: true })
		.isEmail()
		.withMessage("Please provide a valid email."),
	check("password")
		.exists({ checkFalsy: true })
		.withMessage("Please provide a password."),
	handleValidationErrors,
];

router.patch(
	"/",
	checkJwt,
	asyncHandler(async (req, res) => {
		const { email, nickname, picture } = req.body;
		let user = await User.findOne({
			where: {
				email,
			},
			include: [Payment],
		});

		if (!user) {
			user = await User.create({ email, username: nickname, picture });
			res.status(201).json({
				user: {
					id: user.id,
					username: user.nickname,
					email: user.email,
					picture: user.picture,
					alreadyPaid: false,
				},
			});
		} else {
			res.status(201).json({
				user: {
					id: user.id,
					nickname: user.nickname,
					email: user.email,
					picture: user.picture,
					alreadyPaid: user.alreadyPaid,
				},
			});
		}
	})
);

module.exports = router;
