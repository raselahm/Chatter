import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCgfbAKFXypktDbm1h4L_3rGy4UQ59Wqo0",
    authDomain: "chatter-67f85.firebaseapp.com",
    projectId: "chatter-67f85",
    storageBucket: "chatter-67f85.appspot.com",
    messagingSenderId: "270749550267",
    appId: "1:270749550267:web:aa76de52dacf25c69ccb9e"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider, db };