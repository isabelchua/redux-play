import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

const PostForm = ({ auth: { isAuthenticated, loading }, addPost }) => {
	const [shop, setShop] = useState({
		text: '',
		description: '',
		phone: '',
		address:'',
	});



	const onChange = (e) => {
		setShop({
			...shop,
			[e.target.name]: e.target.value
		});
	}

	return (
		<Fragment>
			{isAuthenticated && (
				<div className="post-form">
					<form
						className="form my-1"
						onSubmit={e => {
							e.preventDefault();
							addPost( shop );
							setShop("");
						}}
					>
						<input
							type='text'
							name="text"
							placeholder="Enter restaurant name"
							value={shop.text}
							onChange={e => onChange(e)}
							required
						/>
						<input
							type='text'
							name="description"
							placeholder="Enter Description"
							value={shop.description}
							onChange={e => onChange(e)}
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
