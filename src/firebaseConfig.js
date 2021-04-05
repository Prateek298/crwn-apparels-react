import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyBrAQVXR97SMtesihlGIDZ5YwoX-L3wZOk',
	authDomain: 'crwn-clothing-b69ca.firebaseapp.com',
	projectId: 'crwn-clothing-b69ca',
	storageBucket: 'crwn-clothing-b69ca.appspot.com',
	messagingSenderId: '744293809023',
	appId: '1:744293809023:web:e60272102254607e07784a'
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	// gets user reference from users document in cloud firestore
	const userRef = firestore.doc(`users/${userAuth.uid}`);

	// retreives data/snapshot of user with the help of user reference
	const userSnap = await userRef.get();

	// Creating new user if new user signs up
	if (!userSnap.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			});
		} catch (err) {
			console.log('User creation error ', err.message);
		}
	}

	return userRef;
};

export default firebase;
