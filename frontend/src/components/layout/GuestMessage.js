import React from "react";
import { Link } from "react-router-dom";

const GuestMessage = () => {
	return (
		<div>
			<div className="post">
				Please <Link to="/register">Register</Link> or{" "}
				<Link to="/login">Login</Link> to add Reviews!
			</div>
		</div>
	);
};

export default GuestMessage;
