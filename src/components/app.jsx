import { Router } from 'preact-router'

import Navigation from './navigation'

// Code-splitting is automated for `routes` directory
import Home from '../routes/home'
import Profile from '../routes/profile'
import Quiz from '../routes/quiz'
import SignInScreen from '../routes/auth'

const App = () => (
  <div id='app'>
    <Router>
      <Home path='/' />
      <Profile path='/profile/' user='me' />
      <Profile path='/profile/:user' />
      <Quiz path='/quiz' id='1' />
      <SignInScreen path='/signin' />
    </Router>
    <Navigation />
  </div>
)

export default App
