import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const secret = "jwtsecret";

const protectRoute = async (req, res, next) => {
	try {

//calling token from cookie 
		const token = req.cookies.jwt;

		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}

//decoding the encoded jwt user data
		const decoded = jwt.verify(token, secret);

		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}

//finding decided user by id and 
		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		req.user = user;

		next();
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export default protectRoute;