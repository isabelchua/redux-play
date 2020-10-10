import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

const PostForm = ({ auth: { isAuthenticated, loading }, addPost }) => {
	const [text, setText] = useState("");

	return (
		<Fragment>
			{isAuthenticated && (
				<div className="post-form">
					<form
						className="form my-1"
						onSubmit={e => {
							e.preventDefault();
							addPost({ text });
							setText("");
						}}
					>
						<input
							type='text'
							name="text"
							placeholder="Enter restaurant name"
							value={text}
							onChange={e => setText(e.target.value)}
							required
						/>
						<input type="submit" className="btn" value="Submit" />
					</form>
				</div>
			)}
		</Fragment>
	);
};

PostForm.propTypes = {
	addPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { addPost })(PostForm);
