import React from 'react'
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import '../App.css';


const drawerWidth = 240;

export default function Home() {
  return (
    <div className='Homepage'>
        <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <div className='home'>
        <div className='cont'>
          <h1>Welcome to Memento</h1>
          <p>This site helps you save and record your notes, tasks, and daily expenses</p>
        </div>
        <img src='bg.png' alt='pic'></img>
        </div>
      </Box>
      
    </div>
  )
}
