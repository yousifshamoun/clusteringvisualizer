import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { GlobalState } from '../reduxStore/reducers/global';
import naiveRandom from '../Algorithms/Random/naiveRandom';
import clusterRandom from '../Algorithms/Random/clusterRandom';
import linearRandom from '../Algorithms/Random/linearRandom';
import circluarRandom from '../Algorithms/Random/circularRandom';
import store from '../reduxStore';
export default function RandomMenu(props: GlobalState) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const options = ["Set Random", "Naive", "Cluster", "Linear", "Circular"]
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleNaive = () => {
    handleClose()
    setSelectedIndex(1)
    store.dispatch({type: "START"})
    naiveRandom()
    
  }
  const handleCluster = () => {
    handleClose()
    setSelectedIndex(2)
    store.dispatch({type: "START"})
    clusterRandom()
    
  }
  const handleLinear = () => {
    handleClose()
    setSelectedIndex(3)
    store.dispatch({type: "START"})
    linearRandom()
    
  }
  const handleCircular = () => {
  handleClose()
  setSelectedIndex(4)
  store.dispatch({type: "START"})
  circluarRandom()
  
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
        <MenuItem onClick={handleNaive}>Naive</MenuItem>
        <MenuItem onClick={handleCluster}>Cluster</MenuItem>
        <MenuItem onClick={handleLinear}>Linear</MenuItem>
        <MenuItem onClick={handleCircular}>Circular</MenuItem>
      </Menu>
    </div>
  );
}
