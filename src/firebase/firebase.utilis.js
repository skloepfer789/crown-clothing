import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCI_n5zKXIF4ZwP10A9jJH3-xOy_DhJMcc",
    authDomain: "crown-db-8e0f9.firebaseapp.com",
    projectId: "crown-db-8e0f9",
    storageBucket: "crown-db-8e0f9.appspot.com",
    messagingSenderId: "668426851857",
    appId: "1:668426851857:web:af251ba39095bf3f3583b0"
};

//checking if Google User is logged in, if they previous exist, and if they don't adding them to users
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { displayName, email} = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }

    return userRef;
}

/*
//exporting data to firebase. Don't reuse
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();

}
*/

//pulls collections from DB and makes them usable.
export const convertCollectionShapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const {title, items} = doc.data();

    return {
      //encodeURI passes a string, and takes out any symbols a URL can't process. This will remove caps etc.
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
      //this creates an array, next needs to be an object map
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  } , {});

};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new  firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

/*
Querying Firebase:

From Collection, get THIS user with ID. From that User, get all cart items stored. From cart items, we want the object with THIS id. translation =>

firestore.collection('users').doc('[id of document we're looking for]').collection('cartItems').doc('[id of doc we're looking for]')

SIMPLER VERSION HERE. 
firestore.doc('/users/[insert ID here]/cartItems/[insert ID here]')

*/