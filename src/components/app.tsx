import 'firebase/compat/auth'

import React from 'react'

import { getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation
} from 'react-router'
import { BrowserRouter } from 'react-router-dom'

import { profileIsSet } from '../helper/auth'
import SignInScreen from '../routes/auth'
import UpdateProfile from '../routes/createProfile'
import Home from '../routes/home'
import Profile from '../routes/profile'
import QuizPage from '../routes/quiz'
import { initializeFirebase } from './auth/fireBaseSetup'
import LogOut from './auth/LogOut'
import Navigation from './navigation'
import FriendsPage from '../routes/friends'

const RequireAuth: React.FC = () => {
  const location = useLocation()
  if (getApps().length === 0) {
    initializeFirebase()
  }

  // Force user to sign in
  if (getAuth().currentUser == null) {
    return <Navigate to='/signin' replace state={{ from: location.pathname }} />
  }

  // Force new users to create a profile
  if (!profileIsSet()) {
    window.history.replaceState(null, '', '/createProfile')
    return <UpdateProfile />
  }

  return <><Outlet /><Navigation /></>
}
// getAuth().signOut()

const App: React.FC = () => (
  <div id='app'>
    <BrowserRouter>
      <Routes>
        {/* Protected routes */}
        <Route path='/' element={<RequireAuth />}>
          <Route path='home' element={<Home />} />
          <Route path='profile/:user' element={<Profile />} />
          <Route path='profile' element={<Profile />} />
          <Route path='quiz' element={<QuizPage id={1} />} />
          <Route path='logout' element={<LogOut />} />
          <Route path='createProfile' element={<UpdateProfile />} />
          <Route path='friends' element={<FriendsPage />} />
        </Route>
        {/* /signin should be the only open route */}
        <Route path='/signin' element={<SignInScreen />} />
      </Routes>
    </BrowserRouter>
  </div>
)

export default App
