import axios from "axios";
import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../../actions/profile";

const CreateProfile = ({ createProfile, history }) => {
	const [formData, setFormData] = useState({
		website: "",
		avatar: "",
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

	const {
		website,
		avatar,
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
		createProfile(formData, history);
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
			<h1 className="large text-primary">Create Your Profile</h1>
			<form className="form" onSubmit={e => onSubmit(e)}>
				<p>Add your avatar</p>
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
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Location"
						name="location"
						value={location}
						onChange={e => onChange(e)}
					/>
				</div>

				<div className="form-group">
					<textarea
						placeholder="Tell us about yourself"
						name="bio"
						value={bio}
						onChange={e => onChange(e)}
					/>
				</div>

				<div className="my-2">
					<button
						onClick={() => toggleSocialInputs(!displaySocialInputs)}
						type="button"
						className="btn btn-light"
					>
						Add Your Social Network
					</button>
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

				<input type="submit" className="btn" />
				<Link className="btn" to="/dashboard">
					Go Back
				</Link>
			</form>
		</Fragment>
	);
};

CreateProfile.propTypes = {
	createProfile: PropTypes.func.isRequired
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
