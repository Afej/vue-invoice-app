import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDtO35nfPK8FI_h2a1qqhGyS70jdxWIX5k",
  authDomain: "invoice-app-vue-fca76.firebaseapp.com",
  projectId: "invoice-app-vue-fca76",
  storageBucket: "invoice-app-vue-fca76.appspot.com",
  messagingSenderId: "94813577697",
  appId: "1:94813577697:web:0164e8eee9ed62243f72a0",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
