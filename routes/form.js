const express = require("express");
const { asyncHandler } = require("../utils");
const { check } = require("express-validator");
const checkJwt = require("../authO").checkJwt;
const _ = require("lodash");

const router = express.Router();
const db = require("../db/models");
const { User, Form } = db;

const formNotFoundError = (id) => {
	const err = Error("Unauthorized");
	err.errors = [`Form with id of ${id} could not be found.`];
	err.title = "You are not able to get the form.";
	err.status = 401;
	return err;
};

router.post(
	"/",
	checkJwt,
	asyncHandler(async (req, res, next) => {
		const {
			officeTitle,
			candidateName,
			district,
			address,
			occupation,
			userId,
		} = req.body;
		const form = await Form.create({
			userId,
			officeTitle: officeTitle,
			candidateName,
			district,
			address,
			occupation,
		});
		res.status(201).json({ form });
	})
);
router.get(
	"/:formId",
	asyncHandler(async (req, res) => {
		const formId = parseInt(req.params.formId, 10);
		const form = await Form.findByPk(formId, {});
		if (form) {
			res.json({ form });
		} else {
			next(postNotFoundError(formId));
		}
	})
);
module.exports = router;
