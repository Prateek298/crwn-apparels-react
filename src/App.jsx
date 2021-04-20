import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import { auth, createUserProfileDocument } from './firebaseConfig';
import setCurrentUser from './redux/user/user-actions';
import { selectCurrentUser } from './redux/user/user-selectors';

import HomePage from './pages/homepage/homepage-comp';
import ShopPage from './pages/shop/shop-comp';
import AuthPage from './pages/authPage/authPage-comp';
import { default as CheckoutPage } from './pages/checkoutPage/checkoutPage-container';

import { default as Header } from './components/header/header-container';

class App extends React.Component {
	unsubscribeFromAuth = null;

	componentDidMount() {
		const { setCurrentUser } = this.props;

		this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				userRef.onSnapshot(snapShot => {
					setCurrentUser({
						currentUser: {
							id: snapShot.id,
							...snapShot.data()
						}
					});
				});
			}
			else {
				setCurrentUser(userAuth);
			}
		});
	}

	componentWillUnmount() {
		auth.unsubscribeFromAuth();
	}

	render() {
		return (
			<div>
				<Header />
				{/* Switch works like switch case */}
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/shop" component={ShopPage} />
					<Route exact path="/checkout" component={CheckoutPage} />
					<Route
						exact
						path="/sign"
						render={() => (this.props.currentUser ? <Redirect to="/" /> : <AuthPage />)}
					/>
				</Switch>
			</div>
		);
	}
}

// createStructuredSelector automatically passes state to the the selector functions
const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
	setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
