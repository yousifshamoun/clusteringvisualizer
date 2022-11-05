import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import store from '../reduxStore';
import { GlobalState } from '../reduxStore/reducers/global';
import naiveRandom from '../Algorithms/Random/naiveRandom';
import clusterRandom from '../Algorithms/Random/clusterRandom';
import linearRandom from '../Algorithms/Random/linearRandom';
export default function RandomMenu(props: GlobalState) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const options = ["Set Random", "Naive", "Cluster", "Linear"]
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSlow = () => {
    handleClose()
    setSelectedIndex(1)
    naiveRandom()
  }
  const handleMedium = () => {
    handleClose()
    setSelectedIndex(2)
    clusterRandom()
  }
  const handleFast = () => {
    handleClose()
    setSelectedIndex(3)
    linearRandom()
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
        <MenuItem onClick={handleSlow}>Naive</MenuItem>
        <MenuItem onClick={handleMedium}>Cluster</MenuItem>
        <MenuItem onClick={handleFast}>Linear</MenuItem>
      </Menu>
    </div>
  );
}
