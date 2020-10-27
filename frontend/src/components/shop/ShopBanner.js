import React from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import Rating from "@material-ui/lab/Rating";
import Button from "@material-ui/core/Button";
import RoomIcon from "@material-ui/icons/Room";
import ShareIcon from "@material-ui/icons/Share";
import { deletePost } from "../../actions/post";

import { useHistory, Link } from "react-router-dom";

import foodImage from "../../img/food.jpg";

const ShopBanner = ({
	addLike,
	removeLike,
	deletePost,
	auth,
	post: {
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
		phone
	},
	showActions
}) => {
	let history = useHistory();

	// useEffect(() => {
	// 	history.push("/");
	// }, [deletePost]);

	// if (deletePost) {
	// 	<Redirect to="/shops" />;
	// }

	const editShop = async e => {
		try {
			// await editPost(_id);
			history.push("/");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="shop-banner">
			<div className="shop-details">
				<h2>{shopname}</h2>
				{/* <p>{short && short}</p> */}
				<strong>{short}</strong>
				<img
					// src={foodImage}
					src={"../" + image}
					style={{ width: "250px", margin: "10px 0", display: "block" }}
					alt="Food Banner"
				/>
				<p>{phone} (415) 555-1515</p>
				<p>{address} 2974 Westheimer Santa Ana, Illinois 85633</p>
				<p>
					{description}
					Located in the heart of the City, this place is known for good
					food, and good service!
				</p>
				<div className="wrap">
					<Rating name="read-only" value={4.5} readOnly precision={0.5} />
					{reviews.length} Reviews
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
						{/* <button
							// onClick={e => deletePost(_id)}
							onClick={deleteShop}
							type="button"
							className="btn btn-danger"
						>
							<i className="fas fa-times" /> Delete Shop
						</button> */}
						<Link to={`/edit-shop/${_id}`} className="btn btn-dark">
							Edit Shop
						</Link>
						{/* <button
							// onClick={e => deletePost(_id)}
							onClick={editShop}
							type="button"
							className="btn btn-danger"
						>
							<i className="fas fa-times" /> Edit Shop
						</button> */}
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
