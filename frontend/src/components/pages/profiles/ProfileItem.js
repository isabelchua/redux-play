import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileItem = ({
	profile: {
		user: { _id, name },
		location,
		avatar
	}
}) => {
	return (
		<div className="profile bg-light">
			<img
				src={avatar}
				alt=""
				className="round-img"
				height="100"
				width="100"
			/>
			<div>
				<h2>{name}</h2>

				<p className="my-1">{location && <span>{location}</span>}</p>
				<Link to={`/profile/${_id}`} className="btn btn-primary">
					View Profile
				</Link>
			</div>
		</div>
	);
};

ProfileItem.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileItem;
