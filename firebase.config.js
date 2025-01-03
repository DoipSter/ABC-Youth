import firebase from '@react-native-firebase/app';
import { getDatabase } from '@react-native-firebase/database';

const firebaseConfig = {
    apiKey: 'AIzaSyDYG1IPmCg9CneBlRwZuPZ5BDQROCmTvNo',
    authDomain: 'abc-youth.firebaseapp.com',
    databaseURL: 'https://abc-youth-default-rtdb.firebaseio.com',
    projectId: 'abc-youth',
    storageBucket: 'abc-youth.firebasestorage.app',
    messagingSenderId: '1072549013512',
    appId: '1:1072549013512:ios:10e1b81873706f0a81c9bd',
  };

  if (firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
  }

  const db = getDatabase();

  export { db };