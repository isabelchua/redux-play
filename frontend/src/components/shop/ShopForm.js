import axios from "axios";
import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
import { TextField } from "@material-ui/core";

const ShopForm = ({ auth: { isAuthenticated, loading }, addPost }) => {
	const [shop, setShop] = useState({
		shopname: "",
		description: "",
		phone: "",
		address: "",
		image: "",
		short: ""
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
								shopname: "",
								description: "",
								phone: "",
								address: "",
								image: "",
								short: ""
							});
						}}
					>
						<span>Restaurant Name:</span>
						<input
							type="text"
							name="shopname"
							placeholder="Enter restaurant name"
							value={shop.shopname}
							onChange={e => onChange(e)}
							required
						/>
						<span>Image:</span>
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
						<span>Phone:</span>
						<input
							type="text"
							name="phone"
							placeholder="Enter Phone"
							value={shop.phone}
							onChange={e => onChange(e)}
						/>
						<span>Address:</span>
						<input
							type="text"
							name="address"
							placeholder="Enter Address"
							value={shop.address}
							onChange={e => onChange(e)}
						/>
						<span>Description:</span>
						<textarea
							type="text"
							name="description"
							placeholder="Enter Description"
							value={shop.description}
							onChange={e => onChange(e)}
						/>
						<span>Short Description:</span>
						<input
							type="text"
							name="short"
							placeholder="Enter Short Description"
							value={shop.short}
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
	auth: state.auth
});

export default connect(mapStateToProps, { addPost })(ShopForm);
