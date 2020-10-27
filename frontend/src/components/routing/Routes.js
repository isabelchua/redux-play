import React from "react";
import { Route, Switch } from "react-router";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Alert from "../layout/Alert";
import Dashboard from "../dashboard/Dashboard";
import CreateProfile from "../pages/profile-forms/CreateProfile";
import EditProfile from "../pages/profile-forms/EditProfile";

import Profiles from "../pages/profiles/Profiles";
import Profile from "../profile/Profile";
//import Posts from "../shop/Shops";
import PrivateRoute from "../routing/PrivateRoute";
import NotFound from "../layout/NotFound";
import AddShop from "../shop/AddShop";
import EditShop from "../shop/EditShop";
import Footer from "../layout/Footer";
import Shops from "../shop/Shops";

const Routes = () => {
	return (
		<>
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
					<PrivateRoute exact path="/edit-shop/:id" component={EditShop} />
					<PrivateRoute
						exact
						path="/edit-profile"
						component={EditProfile}
					/>

					<Route exact path="/posts" component={Shops} />
					<Route component={NotFound} />
				</Switch>
			</div>
			<Footer />
		</>
	);
};

export default Routes;
