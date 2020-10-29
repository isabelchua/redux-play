import React, { useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getPost } from "../../actions/post";
import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";
import ShopBanner from "./ShopBanner";
import Footer from "../layout/Footer";
import GuestMessage from "../layout/GuestMessage";
import StarTotal from "./StarTotal";

const ShopPage = ({
	getPost,
	post: { post, loading },
	auth: { isAuthenticated },
	match
}) => {
	useEffect(() => {
		getPost(match.params.id);
		// eslint-disable-next-line
	}, [getPost]);

	return loading || post === null ? (
		<Spinner />
	) : (
		<div className="main-wrap">
			<div className="col1">
				<ShopBanner post={post} review={post.reviews} />
				{/* {post.reviews.map(review => (
					<StarTotal review={review} />
				))} */}
				{post.reviews.map(review => (
					<StarTotal review={review} />
				))}
			</div>
			<div className="col2">
				{isAuthenticated ? (
					<ReviewForm postId={post._id} />
				) : (
					<GuestMessage />
				)}
				<div className="sort">
					<p className="right">Sort by Date</p>
				</div>
				<div className="comments">
					{post.reviews.map(review => (
						<ReviewItem
							key={review._id}
							review={review}
							postId={post._id}
						/>
					))}
				</div>
				<Footer />
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	auth: state.auth,
	post: state.post
});

export default connect(mapStateToProps, { getPost })(ShopPage);
