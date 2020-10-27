import React from "react";
import { Link } from "react-router-dom";

const GuestMessage = () => {
	return (
		<div className="post no-margin">
			Please <Link to="/register">Register</Link> or{" "}
			<Link to="/login">Login</Link> to add Reviews!
		</div>
	);
};

export default GuestMessage;
