const express = require("express");
const paypal = require("paypal-rest-sdk");
const { asyncHandler } = require("../utils");
const { check } = require("express-validator");
const checkJwt = require("../authO").checkJwt;
const _ = require("lodash");

const router = express.Router();
const db = require("../db/models");
const { User, Payment } = db;

const userNotFound = (userId) => {
	const err = new Error("User not found");
	err.errors = [`User with id: ${userId} could not be found.`];
	err.title = "User not found.";
	err.status = 404;
	return err;
};

router.post(
	"/",
	checkJwt,
	asyncHandler(async (req, res, next) => {
		const {
			payerId,
			userId,
			paymentEmail,
			amount,
			currentcyCode,
			payerName,
			userEmail,
		} = req.body;
		const payment = await Payment.create({
			payerId,
			userId,
			emailAddress: paymentEmail,
			amount,
			currentcyCode,
			payerName,
			alreadyPaid: true,
		});

		const user = await User.findOne({
			where: {
				id: userId,
				email: userEmail,
			},
		});

		if (user) {
			await user.update({ alreadyPaid: true });
		} else {
			next(userNotFound(userId));
		}
		res.status(201).json({ payment, message: "Update successfully" });
	})
);

router.get(
	"/:payerId",
	asyncHandler(async (req, res, next) => {
		const payerId = req.params.payerId;
		const payment = await Payment.findOne({
			where: {
				payerId: payerId,
			},
		});
		if (payment) {
			res.json({ payment });
		} else {
			res.send("failed");
		}
	})
);

module.exports = router;
