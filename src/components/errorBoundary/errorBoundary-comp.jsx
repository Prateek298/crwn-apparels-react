import React from 'react';

import './errorBoundary.scss';

class ErrorBoundary extends React.Component {
	constructor() {
		super();

		this.state = { hasErrored: false };
	}

	static getDerivedStateFromError(error) {
		return { hasErrored: true };
	}

	componentDidCatch(error, info) {
		console.log(error);
		console.log(info);
	}

	render() {
		if (this.state.hasErrored) {
			return (
				<div className="error-image-overlay">
					<div className="error-image-container" />
					<h2 className="error-image-text">Oops! Error loading the page...</h2>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
