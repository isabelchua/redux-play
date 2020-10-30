import React from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import Rating from "@material-ui/lab/Rating";
import Button from "@material-ui/core/Button";
import RoomIcon from "@material-ui/icons/Room";
import ShareIcon from "@material-ui/icons/Share";
import { deletePost } from "../../actions/post";

import { useHistory, Link } from "react-router-dom";
import StarTotal from "./StarTotal";

const ShopBanner = ({
	deletePost,
	auth,
	review: { rating },
	post: {
		post,
		_id,
		shopname,
		name,
		avatar,
		user,
		likes,
		reviews,
		date,
		short,
		image,
		description,
		address,
		phone,
		loading
	},
	showActions
}) => {
	let history = useHistory();

	// const editShop = async e => {
	// 	try {
	// 		// await editPost(_id);
	// 		history.push("/");
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// };

	return (
		<div className="shop-banner">
			<div className="shop-details">
				<h2>{shopname}</h2>
				<strong>{short}</strong>
				<img
					src={"../" + image}
					style={{ width: "250px", margin: "10px 0", display: "block" }}
					alt="Food Banner"
				/>
				<p>{phone}</p>
				<p>{address} </p>
				<p>{description}</p>
				<div className="wrap">
					<StarTotal review={post} />
					{/* <Rating name="read-only" value={4.5} readOnly precision={0.5} /> */}
					{reviews.length} Reviews
					{/* {rating[0] && rating[0]} */}
				</div>

				<div className="shop-button">
					<Button
						variant="contained"
						color="primary"
						className="btn"
						endIcon={<RoomIcon className="btn-icon" />}
					>
						{" "}
						Get Directions
					</Button>
					<Button
						variant="contained"
						color="primary"
						className="btn bg-color-sub"
						endIcon={<ShareIcon className="btn-icon" />}
					>
						{" "}
						Share
					</Button>
				</div>
				<p className="post-date">
					Added on <Moment format="MM/DD/YYYY">{date}</Moment>
				</p>

				{auth.user && !auth.loading && user === auth.user._id && (
					<>
						<button
							// onClick={e => deletePost(_id)}
							onClick={deletePost}
							type="button"
							className="btn btn-danger"
						>
							<i className="fas fa-times" /> Delete Shop
						</button>
						<Link to={`/edit-shop/${_id}`} className="btn btn-dark">
							Edit Shop
						</Link>
					</>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { deletePost })(ShopBanner);
