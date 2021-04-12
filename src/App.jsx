import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import { checkUserSession } from './redux/user/user-actions';
import { selectCurrentUser } from './redux/user/user-selectors';

import HomePage from './pages/homepage/homepage-comp';
import ShopPage from './pages/shop/shop-comp';
import AuthPage from './pages/authPage/authPage-comp';
import CheckoutPage from './pages/checkoutPage/checkoutPage-comp';

import Header from './components/header/header-comp';

class App extends React.Component {
	componentDidMount() {
		const { checkUserSession } = this.props;
		checkUserSession();
	}

	// componentWillUnmount() {
	// }

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
	checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
