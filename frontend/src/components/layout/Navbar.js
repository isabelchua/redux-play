import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import Logo from './Logo'
import SearchBar from "./SearchBar";

const Navbar = ({ auth: { user, isAuthenticated, loading }, logout }) => {
	const authLinks = (
		<>
			<li>
				<Link to="/add-shop">Add Shop</Link>
			</li>
			<li>
				<Link to="/posts">Shops</Link>
			</li>
			<li>
				<Link to="/dashboard">
					<i className="fas fa-user" />{" "}
					<span className="hide-sm">{user && user.name.trim().split(" ")[0]}</span>
				</Link>
			</li>
			<li>
				<a onClick={logout} href="#!">
					<i className="fas fa-sign-out-alt" />{" "}
					<span className="hide-sm">Logout</span>
				</a>
			</li>
		</>
	);

	const adminLinks = (
		<>
			<li>
				<Link to="/add-shop">Add Shop</Link>
			</li>
			<li>
				<Link to="/profiles">Users</Link>
			</li>
			<li>
				<Link to="/posts">Shops</Link>
			</li>
			<li>
				<Link to="/dashboard">
					<i className="fas fa-user" />{" "}
					<span className="hide-sm">admin</span>
				</Link>
			</li>
			<li>
				<a onClick={logout} href="#!">
					<i className="fas fa-sign-out-alt" />{" "}
					<span className="hide-sm">Logout</span>
				</a>
			</li>
		</>
	);

	const guestLinks = (
		<>
			<li>
				<Link to="/posts">Shops</Link>
			</li>
			<li>
				<Link to="/register">Register</Link>
			</li>
			<li>
				<Link to="/login">Login</Link>
			</li>
		</>
	);

	return (
		<div className="nav-bar">
			<div className='logo-wrap'>
				
				<Logo/><Link to="/"><h2>SharkNip</h2></Link>
				
			</div>
			<SearchBar/>
			<div>
			{!loading && (
				<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
			)}
			</div>
		</div>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
