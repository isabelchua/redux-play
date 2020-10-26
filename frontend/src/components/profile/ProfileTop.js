import React from "react";
import PropTypes from "prop-types";

const ProfileTop = ({
	profile: {
		location,
		website,
		social,
		user: { name }
	}
}) => {
	return (
		<div className="profile-top">
			{/* <img className="round-img my-1" src={profile.avatar} alt="" /> */}
			<h1 className="large">{name}</h1>
			{/* <img src={profile} alt="avatar" width="100" height="100" /> */}

			<p>{location && <span>{location}</span>}</p>

			<div className="icons my-1">
				{website && (
					<a href={website} target="_blank" rel="noopener noreferrer">
						<i className="fas fa-globe fa-2x" />
					</a>
				)}
				{social && social.twitter && (
					<a href={social.twitter}>
						<i className="fab fa-twitter fa-2x" />
					</a>
				)}
				{social && social.facebook && (
					<a href={social.facebook}>
						<i className="fab fa-facebook fa-2x" />
					</a>
				)}

				{social && social.youtube && (
					<a href={social.youtube}>
						<i className="fab fa-youtube fa-2x" />
					</a>
				)}
				{social && social.instagram && (
					<a href={social.instagram}>
						<i className="fab fa-instagram fa-2x" />
					</a>
				)}
			</div>
		</div>
	);
};

ProfileTop.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileTop;
