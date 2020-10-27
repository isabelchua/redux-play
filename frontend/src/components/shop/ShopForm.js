import axios from "axios";
import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

const ShopForm = ({ auth: { isAuthenticated, loading }, addPost }) => {
	const [shop, setShop] = useState({
		shop: "",
		description: "",
		phone: "",
		address: "",
		image: ""
	});
	const [image, setImage] = useState("");
	const [preview, setPreview] = useState("");
	const [uploading, setUploading] = useState(false);

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

	return (
		<Fragment>
			{isAuthenticated && (
				<div className="post-form">
					<form
						className="form"
						onSubmit={e => {
							e.preventDefault();
							addPost(shop);
							setShop({
								shop: "",
								description: "",
								phone: "",
								address: "",
								image: ""
							});
						}}
					>
						<input
							type="text"
							name="shop"
							placeholder="Enter restaurant name"
							value={shop.shop}
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

ShopForm.propTypes = {
	addPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { addPost })(ShopForm);
