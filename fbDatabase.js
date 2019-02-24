import firebase from 'firebase';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyDLmI9svFkYMxHcbdbjEpATt3OBH_dMUaQ",
    authDomain: "bookapp-177aa.firebaseapp.com",
    databaseURL: "https://bookapp-177aa.firebaseio.com",
    projectId: "bookapp-177aa",
    storageBucket: "bookapp-177aa.appspot.com",
    messagingSenderId: "441435453933"
};

export const fbApp = firebase.initializeApp(config);
export const fbDatabase = firebase.database(fbApp);