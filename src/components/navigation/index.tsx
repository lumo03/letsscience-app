import Paper from '@mui/material/Paper'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Home from '@mui/icons-material/Home'
import VerifiedUser from '@mui/icons-material/VerifiedUser'
import QuestionMark from '@mui/icons-material/QuestionMark'
import { useState } from 'react'

const Navigation = (): JSX.Element => {
  const [value, setValue] = useState('')

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
      >
        <BottomNavigationAction href='/' label='Home' icon={<Home />} />
        <BottomNavigationAction href='/profile' label='Profile' icon={<VerifiedUser />} />
        <BottomNavigationAction href='/quiz' label='Quiz' icon={<QuestionMark />} />
      </BottomNavigation>
    </Paper>
  )
}

export default Navigation
