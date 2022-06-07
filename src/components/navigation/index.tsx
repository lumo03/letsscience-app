import { BottomNavigation, BottomNavigationAction, BottomNavigationActionProps, Paper } from '@mui/material'
import { Restore, Favorite, LocationOn, Home, VerifiedUser, QuestionMark } from '@mui/icons-material'
import { useState } from 'react'
import { Link } from "preact-router"
import React from "react"

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
        <BottomNavigationAction href="/" label='Home' icon={<Home />} />
        <BottomNavigationAction href="/profile" label='Profile' icon={<VerifiedUser />} />
        <BottomNavigationAction href="/quiz" label='Quiz' icon={<QuestionMark />} />
      </BottomNavigation>
    </Paper>
  )
}




export default Navigation
