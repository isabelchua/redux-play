import React, { Fragment } from "react";
import spinner from "./spinner.gif";
import CircularProgress from "@material-ui/core/CircularProgress";

export default () => (
	<Fragment>
		<CircularProgress color="#FFF" size="8rem" thickness="2" />
	</Fragment>
);
