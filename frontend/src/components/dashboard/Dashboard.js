import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";

import { getCurrentProfile, deleteAccount } from "../../actions/profile";

const Dashboard = ({
	getCurrentProfile,
	deleteAccount,
	auth: { user },
	profile: { profile, loading }
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	return loading && profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			
			<p className="lead">
				<i className="fas fa-user" /> {user && user.name}
			</p>
			{profile !== null ? (
				<Fragment>
					<DashboardActions />

					<div className="my-2">
						<button
							className="btn btn-danger"
							onClick={() => deleteAccount()}
						>
							<i className="fas fa-user-minus" /> Delete My Account
						</button>
					</div>
				</Fragment>
			) : (
				<Fragment>
					<p>
						You have not yet setup a profile, add some info so other
						people will know you better! :')'
					</p>
					<Link to="/create-profile" className="btn btn-primary my-1">
						Create Profile
					</Link>
				</Fragment>
			)}
		</Fragment>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
	Dashboard
);
