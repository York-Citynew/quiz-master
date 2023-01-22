import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  getFirestore,
  arrayUnion,
  getDocs,
  query,
  collection,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { stringToCamelCase } from "../helpers/helpers";
const firebaseConfig = {
  apiKey: "AIzaSyCttUbUJ29ZheNSgAZnk_Y-bp9UWB-FB_w",
  authDomain: "quiz-master-e4328.firebaseapp.com",
  projectId: "quiz-master-e4328",
  storageBucket: "quiz-master-e4328.appspot.com",
  messagingSenderId: "398536833345",
  appId: "1:398536833345:web:b6972bf0e01765e70c89c0",
};

initializeApp(firebaseConfig);
const auth = getAuth();
export const db = getFirestore(); //fix this
export const onAuthStateChangedListener = (callbackFn) =>
  onAuthStateChanged(auth, callbackFn);
export const createUserWithEmailAndPasswordSignUp = async (email, password) => {
  if (email === "" || password === "") {
    return;
  }
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
  }
};
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGooglePopup = async () =>
  await signInWithPopup(auth, provider);

export const createUserDocumentFromAuth = async (userAuth, name = "") => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);
  if (!userSnapShot.exists()) {
    const { email, displayName } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        email,
        displayName: displayName ? displayName : name,
        createdAt,
        scores: {},
      });
    } catch (error) {
      console.log(error);
    }
  }
  return userDocRef;
};
export const addUserRecord = async (userAuth, score, category) => {
  category = stringToCamelCase(
    category.replace("Entertainment: ", "").replace("Science: ", "")
  );
  if (category === "film") category = "movies"; //temporary patch
  try {
    const userDocRef = doc(db, "users", userAuth.uid);
    await setDoc(
      userDocRef,
      {
        scores: { [category]: arrayUnion(score) },
      },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
  }
};
export const queryScoresData = async () => {
  //unable to paginate data with query cursors. could use subcollections.
  const data = {
    movies: [],
    videoGames: [],
    computers: [],
  };
  const q = query(collection(db, "users"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const docSnapShot = doc.data();
    const objectKeysArray = Object.keys(docSnapShot.scores);
    objectKeysArray.forEach((item) => {
      data[item].push({
        name: docSnapShot.displayName,
        highestScore: Math.max(...docSnapShot.scores[item]),
      });
    });
  });
  return data;
};
export const userSignInWithEmailAndPassword = (email, password) => {
  signInWithEmailAndPassword(auth, email, password);
};
export const userSignOut = async () => {
  await signOut(auth);
};
