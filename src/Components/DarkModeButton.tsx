import React, {useEffect, useState} from "react"
import {Button} from "@mui/material"
function DarkModeButton() {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  return (
      <Button variant = "contained" onClick={toggleTheme}>Dark Mode</Button>
  );
}
export default DarkModeButton;