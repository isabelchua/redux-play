import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../../actions/profile";
import IconButton from "@material-ui/core/IconButton";
import ImageIcon from "@material-ui/icons/Image";

const EditProfile = ({
	profile: { profile, loading },
	createProfile,
	getCurrentProfile,
	history
}) => {
	const [formData, setFormData] = useState({
		avatar: "",
		website: "",
		location: "",
		bio: "",
		twitter: "",
		facebook: "",
		youtube: "",
		instagram: ""
	});

	const [image, setImage] = useState("");
	const [preview, setPreview] = useState("");
	const [uploading, setUploading] = useState(false);

	const [displaySocialInputs, toggleSocialInputs] = useState(false);

	useEffect(() => {
		getCurrentProfile();

		setFormData({
			website: loading || !profile.website ? "" : profile.website,
			avatar: loading || !profile.avatar ? "" : profile.avatar,
			location: loading || !profile.location ? "" : profile.location,
			bio: loading || !profile.bio ? "" : profile.bio,
			twitter: loading || !profile.social ? "" : profile.social.twitter,
			facebook: loading || !profile.social ? "" : profile.social.facebook,
			youtube: loading || !profile.social ? "" : profile.social.youtube,
			instagram: loading || !profile.social ? "" : profile.social.instagram
		});
		// eslint-disable-next-line
	}, [loading, getCurrentProfile]);

	const {
		avatar,
		website,
		location,
		bio,
		twitter,
		facebook,
		youtube,
		instagram
	} = formData;

	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = e => {
		e.preventDefault();
		createProfile(formData, history, true);
	};

	const uploadFileHandler = async e => {
		const file = e.target.files[0];
		const imageData = new FormData();
		imageData.append("image", file);
		setUploading(true);

		try {
			const config = {
				headers: {
					"Content-Type": "multipart/form-data"
				}
			};

			const { data } = await axios.post("/api/upload", imageData, config);

			//setImage(data);

			setFormData({ ...formData, avatar: data });

			setUploading(false);
		} catch (error) {
			console.error(error);
			setUploading(false);
		}
	};

	return (
		<Fragment>
			<h1 className="large text-primary">Edit Your Profile</h1>
			<div className="profile-img">
				<img src={avatar} alt="avatar" width="150" height="150" />
			</div>
			<form className="form" onSubmit={e => onSubmit(e)}>
				{/* <label
					aria-label="add image"
					htmlFor="file-upload"
					className="file-upload"
				>
					<IconButton variant="contained" component="span">
						<ImageIcon />
					</IconButton>
				</label> */}

				{/* <input
					id="file-upload"
					type="file"
					name="image"
					accept="image/*"
					placeholder="Enter image url"
					onChange={e => setImage(e.target.value)}
					value={image}
					className="file-upload-btn"
					size="2"
				/> */}

				<input
					id="image-file"
					type="file"
					label="choose file"
					onChange={uploadFileHandler}
				></input>

				{preview && (
					<img
						src={preview}
						alt="img-prev"
						className="img-preview"
						style={{ height: "70px" }}
					/>
				)}

				<div className="form-group">
					<input
						type="text"
						placeholder="Website"
						name="website"
						value={website}
						onChange={e => onChange(e)}
					/>
					<small className="form-text">Your website</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Location"
						name="location"
						value={location}
						onChange={e => onChange(e)}
					/>
					<small className="form-text">Your Location</small>
				</div>

				<div className="form-group">
					<textarea
						placeholder="Tell us about yourself"
						name="bio"
						value={bio}
						onChange={e => onChange(e)}
					/>
					<small className="form-text">
						Tell us a little about yourself
					</small>
				</div>

				<div className="my-2">
					<button
						onClick={() => toggleSocialInputs(!displaySocialInputs)}
						type="button"
						className="btn btn-light"
					>
						Add Social Network Links
					</button>
					<span>Optional</span>
				</div>

				{displaySocialInputs && (
					<Fragment>
						<div className="form-group social-input">
							<i className="fab fa-twitter fa-2x" />
							<input
								type="text"
								placeholder="Twitter URL"
								name="twitter"
								value={twitter}
								onChange={e => onChange(e)}
							/>
						</div>

						<div className="form-group social-input">
							<i className="fab fa-facebook fa-2x" />
							<input
								type="text"
								placeholder="Facebook URL"
								name="facebook"
								value={facebook}
								onChange={e => onChange(e)}
							/>
						</div>

						<div className="form-group social-input">
							<i className="fab fa-youtube fa-2x" />
							<input
								type="text"
								placeholder="YouTube URL"
								name="youtube"
								value={youtube}
								onChange={e => onChange(e)}
							/>
						</div>

						<div className="form-group social-input">
							<i className="fab fa-instagram fa-2x" />
							<input
								type="text"
								placeholder="Instagram URL"
								name="instagram"
								value={instagram}
								onChange={e => onChange(e)}
							/>
						</div>
					</Fragment>
				)}

				<input type="submit" className="btn btn-primary my-1" />
				<Link className="btn" to="/dashboard">
					Go Back
				</Link>
			</form>
		</Fragment>
	);
};

EditProfile.propTypes = {
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
	withRouter(EditProfile)
);
