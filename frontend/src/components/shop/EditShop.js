import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost, getPost } from "../../actions/post";
import Spinner from "../layout/Spinner";

const EditShop = ({
	auth: { isAuthenticated },
	addPost,
	getPost,
	post: { post, _id, loading },
	match,
	history
}) => {
	const [shop, setShop] = useState({
		text: "",
		description: "",
		phone: "",
		address: "",
		image: "",
		short: ""
	});

	const [image, setImage] = useState("");
	const [preview, setPreview] = useState("");
	const [uploading, setUploading] = useState(false);
	// console.log(_id);
	// console.log(match.params.id);
	useEffect(() => {
		getPost(match.params.id);

		if (post !== null) {
			setShop({
				address: loading || !post.address ? "" : post.address,
				text: loading || !post.text ? "" : post.text,
				description: loading || !post.description ? "" : post.description,
				phone: loading || !post.phone ? "" : post.phone,
				short: loading || !post.short ? "" : post.short,
				image: loading || !post.image ? "" : post.image
			});
		}
		// phone: (post && loading) || !post.phone ? "" : post.phone
		// eslint-disable-next-line
	}, [loading, getPost]);

	// console.log(shop);
	// if (post !== null) {
	// 	console.log(post);
	// }
	// if (post === null) {
	// 	// console.log(post.address);
	// } else {
	// 	setShop({
	// 		address: loading && !post.address ? "" : post.address
	// 	});
	// }

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

			setShop({ ...shop, image: data });

			setUploading(false);
		} catch (error) {
			console.error(error);
			setUploading(false);
		}
	};

	const onChange = e => {
		setShop({
			...shop,
			[e.target.name]: e.target.value
		});
	};

	const onSubmit = e => {
		e.preventDefault();
		addPost(shop, history, true);
	};

	return loading || post === null ? (
		<Spinner />
	) : (
		<Fragment>
			{isAuthenticated && (
				<div className="post-form">
					<form className="form" onSubmit={e => onSubmit(e)}>
						<input
							type="text"
							name="text"
							placeholder="Enter restaurant name"
							value={shop.text}
							onChange={e => onChange(e)}
							required
						/>
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

						<input
							type="text"
							name="description"
							placeholder="Enter Description"
							value={shop.description}
							onChange={e => onChange(e)}
						/>
						<input
							type="text"
							name="phone"
							placeholder="Enter Phone"
							value={shop.phone}
							onChange={e => onChange(e)}
						/>
						<input
							type="text"
							name="address"
							placeholder="Enter Address"
							value={shop.address}
							onChange={e => onChange(e)}
						/>
						<input type="submit" className="btn" value="Submit" />
					</form>
				</div>
			)}
		</Fragment>
	);
};

const mapStateToProps = state => ({
	auth: state.auth,
	post: state.post
});

export default connect(mapStateToProps, { getPost })(EditShop);
