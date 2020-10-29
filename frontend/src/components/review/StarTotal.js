import React from "react";
import Rating from "@material-ui/lab/Rating";

const StarTotal = ({ review: { rating } }) => {
	return (
		<div>
			<Rating name="read-only" value={rating} readOnly precision={0.5} />
		</div>
	);
};

export default StarTotal;
