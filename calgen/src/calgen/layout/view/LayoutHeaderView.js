import { Tabs, Tab, Box, Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import './LayoutHeaderView.css';
import { useDispatch, useSelector } from 'react-redux';
import { switchTab } from 'calgen/layout/actions'
import * as Consts from 'calgen/layout/consts'

function LayoutHeaderView() {

  const dispatch = useDispatch()

  const selectedTab = useSelector(state => state.layoutReducers.selectedTab)

  const handleChange = (_event, newValue) => {
    dispatch(switchTab(newValue))
  }

  return (
    <AppBar position="static" className="noprint">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
       
        <Tabs value={selectedTab} onChange={handleChange} aria-label="simple tabs example"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
          <Tab label="四则运算" value={Consts.TAB_ADDMINUS} />
          <Tab label="乘法" value={Consts.TAB_MULTIPLY} />
        </Tabs>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Button variant="outlined">{'关于'}</Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default LayoutHeaderView