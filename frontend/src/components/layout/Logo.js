import React from "react";
import logo from "../../img/logo.png";
import { Link } from "react-router-dom";

function Logo() {
	return (
		<div className="logo">
			<Link to="/">
				<img src={logo} alt="logo" />
			</Link>
		</div>
	);
}

export default Logo;
