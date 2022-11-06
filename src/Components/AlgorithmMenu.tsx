import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import store from '../reduxStore';
import { GlobalState } from '../reduxStore/reducers/global';

export default function AlgorithmMenu(props: GlobalState) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const options = ["Algorithms", "kMeans", "Mean Shift", "DBSCAN"]
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSlow = () => {
    handleClose()
    setSelectedIndex(1)
    store.dispatch({type: "SET_ALGORITHM", payload: "kmeans"})
  }
  const handleMedium = () => {
    handleClose()
    setSelectedIndex(2)
    store.dispatch({type: "SET_ALGORITHM", payload: "meanshift"})
  }
  const handleDB = () => {
    handleClose()
    setSelectedIndex(3)
    store.dispatch({type: "SET_ALGORITHM", payload: "dbscan"})
  }


  return (
    <div>
      <Button
        id="demo-positioned-button"
      aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        disabled = {props.started}
        variant="contained"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        
      >
        {options[selectedIndex]}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleSlow}>kMeans</MenuItem>
        <MenuItem onClick={handleMedium}>Mean Shift</MenuItem>
        <MenuItem onClick={handleDB}>DBSCAN</MenuItem>
      </Menu>
    </div>
  );
}
