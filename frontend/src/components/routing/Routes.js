import React from "react";
import { Route, Switch } from "react-router";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Alert from "../layout/Alert";
import Dashboard from "../dashboard/Dashboard";
import CreateProfile from "../profile-forms/CreateProfile";
import EditProfile from "../profile-forms/EditProfile";

import Profiles from "../pages/profiles/Profiles";
import Profile from "../profile/Profile";
import Posts from "../shop/Posts";
import PrivateRoute from "../routing/PrivateRoute";
import NotFound from "../layout/NotFound";
import AddShop from "../shop/AddShop";

const Routes = () => {
	return (
		<div className="page-wrap">
			<Alert />
			<Switch>
				<Route exact path="/register" component={Register} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/profiles" component={Profiles} />
				<Route exact path="/profile/:id" component={Profile} />
				<PrivateRoute exact path="/dashboard" component={Dashboard} />
				<PrivateRoute
					exact
					path="/create-profile"
					component={CreateProfile}
				/>
				<PrivateRoute exact path="/add-shop" component={AddShop} />
				<PrivateRoute exact path="/edit-profile" component={EditProfile} />

				<Route exact path="/posts" component={Posts} />
				<Route component={NotFound} />
			</Switch>
		</div>
	);
};

export default Routes;
