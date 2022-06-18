// Import FirebaseAuth and firebase.
import React, { useEffect, useState } from 'react'
import StyledFirebaseAuth from '../../components/auth'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import * as firebaseui from 'firebaseui'
import { firebaseConfig } from '../../components/auth/fireBaseSetup'

firebase.initializeApp(firebaseConfig)

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false
  }
}

const SignInScreen: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = useState(false) // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!(user == null))
    })
    return () => unregisterAuthObserver() // Make sure we un-register Firebase observers when the component unmounts.
  }, [])

  if (!isSignedIn) {
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    )
  }
  return (
    <div>
      <p>Welcome {firebase.auth().currentUser?.displayName}! You are now signed-in!</p>
      <a onClick={async () => await firebase.auth().signOut()}>Sign-out</a>
    </div>
  )
}

export default SignInScreen
