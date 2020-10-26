import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";
import IconButton from "@material-ui/core/IconButton";
import ImageIcon from "@material-ui/icons/Image";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import { getCurrentProfile } from "../../actions/profile";

import foodImage from "../../img/food.jpg";

const ReviewForm = ({
	getCurrentProfile,
	postId,
	addComment,
	auth: { user },
	profile: { profile }
}) => {
	const [text, setText] = useState("");
	const [isExpanded, setExpanded] = useState(false);
	const [file, setFile] = useState("");
	const [rating, setRating] = useState(0);
	const [preview, setPreview] = useState("");

	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	function expand() {
		setExpanded(true);
	}

	const handleSubmitFile = e => {
		const file = e.target.files[0];
		if (!preview) return;
		previewFile(file);
	};

	const previewFile = file => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreview(reader.result);
		};
	};

	const uploadImage = async base64EncodedImage => {
		console.log(base64EncodedImage);
		try {
			await fetch("/api/upload", {
				method: "POST",
				body: JSON.stringify({ data: base64EncodedImage }),
				headers: { "Content-type": "application/json" }
			});
		} catch (err) {
			console.error(err);
		}
	};

	const onSubmit = e => {
		e.preventDefault();
		handleSubmitFile();
		console.log(rating);
		if (isNaN(rating) || (isNaN(rating) && text === "")) {
			alert("please rate!");
			return;
		}
		addComment(postId, { text, rating });
		setText("");
		setRating(0);
		setPreview("");
	};

	const handleFile = () => {};

	return (
		<div
			className="review-form"
			style={{ height: isExpanded ? "220px" : "140px" }}
		>
			<form>
				<img
					className="round-img avatar"
					src={profile && "../" + profile.avatar}
					alt=""
				/>
				<div className="col">
					<Rating
						name="rating"
						value={rating}
						onChange={(e, rate) => setRating(rate)}
						precision={0.5}
					/>

					<textarea
						name="text"
						cols="60"
						placeholder="Write a review"
						value={text}
						onChange={e => setText(e.target.value)}
						rows={isExpanded ? 3 : 1}
						onClick={expand}
						required
					/>
					{/* <input
						type="submit"
						className="btn btn-dark my-1"
						value="Submit"
					/> */}
					<div className="img-preview-wrap">
						<input
							id="file-upload"
							type="file"
							name="image"
							accept="image/*"
							onChange={handleFile}
							value={file}
							className="file-upload-btn"
							size="2"
							onClick={expand}
						/>
						<label
							aria-label="add image"
							htmlFor="file-upload"
							className="file-upload"
						>
							<IconButton variant="contained" component="span">
								<ImageIcon />
							</IconButton>
						</label>
						{/* <input
						name="image"
						value={image}
						onChange={onChange}
						placeholder="Add image url"
					></input> */}

						<Button
							onClick={onSubmit}
							variant="contained"
							color="primary"
							className="btn"
							endIcon={<SendIcon className="btn-icon" />}
						>
							{" "}
							Add Review
						</Button>
						{preview && (
							<img
								src={preview}
								alt="img-prev"
								className="img-preview"
								style={{ height: "70px" }}
							/>
						)}
					</div>
				</div>
			</form>
		</div>
	);
};

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, addComment })(
	ReviewForm
);
