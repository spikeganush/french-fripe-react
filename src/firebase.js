import { useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

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
const auth = getAuth(app)

export function logout() {
  return signOut(auth)
}

// Custom Hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState()
  useEffect(() => {
    let mounted = true
    if (mounted) {
      const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user))
      return unsub
    }

    return () => (mounted = false)
  }, [currentUser])

  return currentUser
}

export default getFirestore(app)
