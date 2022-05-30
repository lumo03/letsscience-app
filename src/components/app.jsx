import { Router } from 'preact-router'

import Header from './header'

// Code-splitting is automated for `routes` directory
import Home from '../routes/home'
import Profile from '../routes/profile'
import Quiz from '../routes/quiz'

const App = () => (
  <div id='app'>
    <Header />
    <Router>
      <Home path='/' />
      <Profile path='/profile/' user='me' />
      <Profile path='/profile/:user' />
      <Quiz path='/quiz' id='1' />
    </Router>
  </div>
)

export default App
