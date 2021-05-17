import UserActionTypes from './user-action-types';

export const emailSignUpStart = userCreationInfo => ({
	type: UserActionTypes.EMAIL_SIGN_UP_START,
	payload: userCreationInfo
});

export const googleSignInStart = () => ({
	type: UserActionTypes.GOOGLE_SIGN_IN_START
});

export const emailSignInStart = emailAndPassword => ({
	type: UserActionTypes.EMAIL_SIGN_IN_START,
	payload: emailAndPassword
});

export const signInSuccess = user => ({
	type: UserActionTypes.SIGN_IN_SUCCESS,
	payload: user
});

export const signInFailure = error => ({
	type: UserActionTypes.SIGN_IN_FAILURE,
	payload: error
});

export const checkUserSession = () => ({
	type: UserActionTypes.CHECK_USER_SESSION
});

export const signOutStart = () => ({
	type: UserActionTypes.SIGN_OUT_START
});

export const signOutSuccess = () => ({
	type: UserActionTypes.SIGN_OUT_SUCCESS
});

export const signOutFailure = error => ({
	type: UserActionTypes.SIGN_OUT_FAILURE,
	payload: error
});

export const paymentStart = paymentInfo => ({
	type: UserActionTypes.PAYMENT_START,
	payload: paymentInfo
});

export const paymentSuccess = () => ({
	type: UserActionTypes.PAYMENT_SUCCESS
});

export const paymentFailure = error => ({
	type: UserActionTypes.PAYMENT_FAILURE,
	payload: error
});
