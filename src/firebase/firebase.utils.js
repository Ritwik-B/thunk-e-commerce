import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAdaV_3LhhitvLnt7kuryQELKwZRnQWyj0",
  authDomain: "react-e-commerce-ad988.firebaseapp.com",
  databaseURL: "https://react-e-commerce-ad988.firebaseio.com",
  projectId: "react-e-commerce-ad988",
  storageBucket: "react-e-commerce-ad988.appspot.com",
  messagingSenderId: "420248708972",
  appId: "1:420248708972:web:9ace85138f1e650857b549",
  measurementId: "G-Q3NC2RSS62",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user ", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
