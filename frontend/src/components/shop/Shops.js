import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ShopItem from "./ShopItem";
import { getPosts } from "../../actions/post";

const Shops = ({ getPosts, post: { posts, loading } }) => {
	useEffect(() => {
		getPosts();
	}, [getPosts]);

	return loading ? (
		<Spinner />
	) : (
		<Fragment>
			<h2>Food Places</h2>
			<div className="home-card">
				{posts.map(post => (
					<ShopItem key={post._id} post={post} />
				))}
			</div>
		</Fragment>
	);
};

const mapStateToProps = state => ({
	post: state.post
});

export default connect(mapStateToProps, { getPosts })(Shops);
