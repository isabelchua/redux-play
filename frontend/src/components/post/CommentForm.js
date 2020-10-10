import React, { useState } from "react";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";
import IconButton from "@material-ui/core/IconButton";
// import ImageIcon from "@material-ui/icons/Image";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";

const CommentForm = ({ postId, addComment, auth: { user } }) => {
	const [text, setText] = useState("");
	const [isExpanded, setExpanded] = useState(false);
	const [file, setFile] = useState("");
	const [preview, setPreview] = useState("");
	const [rating, setRating] = useState(0);

	function expand() {
		setExpanded(true);
	}
	const handleFile = e => {
		const file = e.target.files[0];
		// previewFile(file);
	};

	return (
		<div
			className="review-form"
			style={{ height: isExpanded ? "220px" : "140px" }}
		>
			<img className="round-img avatar" src={user && user.avatar} alt="" />
			<div className="col">
				<Rating
					name="rating"
					value={rating}
					onChange={(e, rate) => setRating(rate)}
					precision={0.5}
				/>
				<form
					onSubmit={e => {
						e.preventDefault();
						addComment(postId, { text, rating });
						setText("");
					}}
				>
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
					<input
						type="submit"
						className="btn btn-dark my-1"
						value="Submit"
					/>
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
								{/* <ImageIcon /> */}
							</IconButton>
						</label>
						{/* <input
						name="image"
						value={image}
						onChange={onChange}
						placeholder="Add image url"
					></input> */}

					

						<Button
						
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
								alt="chosen"
								className="img-preview"
								style={{ height: "70px" }}
							/>
						)}
					</div>
				</form>
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { addComment })(CommentForm);
