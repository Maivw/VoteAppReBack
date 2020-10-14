const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const paypal = require("paypal-rest-sdk");
const { authConfig, checkJwt } = require("./authO");
const jwt = require("express-jwt");
const jwtAuthz = require("express-jwt-authz");
const jwksRsa = require("jwks-rsa");

const { ValidationError } = require("sequelize");
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const formRouter = require("./routes/form");
const payRouter = require("./routes/pay");
const config = require("./config/index");
const PAYPAL = config.paypal;

const { environment } = require("./config");

paypal.configure({
	mode: "sandbox",
	client_id: PAYPAL.client_id,
	client_secret: PAYPAL.client_secret,
});

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/form", formRouter);
app.use("/payment", payRouter);
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use((req, res, next) => {
	const err = new Error("The requested resource couldn't be found.");
	err.errors = ["The requested resource couldn't be found."];
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	if (err instanceof ValidationError) {
		err.errors = err.errors.map((e) => e.message);
		err.title = "Sequelize Error";
	}
	next(err);
});

app.use((err, req, res, next) => {
	console.log(err);
	res.status(err.status || 500);
	const isProduction = environment === "production";
	res.json({
		title: err.title || "Server Error",
		errors: err.errors,
		stack: isProduction ? null : err.stack,
	});
});

module.exports = app;
