// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC2yrO0st3cZFg2WPaYG7O81WKWrM4LWo4',
  authDomain: 'french-fripe.firebaseapp.com',
  projectId: 'french-fripe',
  storageBucket: 'french-fripe.appspot.com',
  messagingSenderId: '314710128672',
  appId: '1:314710128672:web:2780f2e56aa289a881e445',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export default getFirestore(app)
