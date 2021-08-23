import { Tabs, Tab } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
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
        <Tabs value={selectedTab} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="加减法" value={Consts.TAB_ADDMINUS} />
          <Tab label="乘法" value={Consts.TAB_MULTIPLY} />
        </Tabs>
      </Toolbar>
    </AppBar>
  )
}

export default LayoutHeaderView



