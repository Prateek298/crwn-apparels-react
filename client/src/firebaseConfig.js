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

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

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

export const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = auth.onAuthStateChanged(userAuth => {
			unsubscribe();
			resolve(userAuth);
		}, reject);
	});
};

export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
	// creates a new collection reference(memory) in firestore with collectionKey as its name
	const collectionRef = firestore.collection(collectionKey);

	// batch groups statements preserving atomicity of the firestore DB
	const batch = firestore.batch();
	objectToAdd.forEach(obj => {
		const newDocRef = collectionRef.doc();
		batch.set(newDocRef, obj);
	});

	return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
	const transformedCollection = collections.docs.map(doc => {
		const { title, items } = doc.data();

		return {
			routeName: encodeURI(title.toLowerCase()),
			id: doc.id,
			title,
			items
		};
	});

	return transformedCollection.reduce((acc, collection) => {
		acc[collection.title.toLowerCase()] = collection;
		return acc;
	}, {});
};

export default firebase;
