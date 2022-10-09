import { createAction } from '@reduxjs/toolkit';

import { userActions } from './user-slice';

export const emailSignUp = createAction('EMAIL_SIGN_UP');

export const emailSignIn = createAction('EMAIL_SIGN_IN');

export const googleSignIn = createAction('GOOGLE_SIGN_IN');

export const signInSuccess = createAction('SIGN_IN_SUCCESS');

export const signOut = createAction('SIGN_OUT');

export const checkUserSession = createAction('CHECK_USER_SESSION');

export const doPayment = createAction('PAYMENT');

export const paymentSuccess = createAction('PAYMENT_SUCCESS');

export const { setCurrentUser, setError } = userActions;
