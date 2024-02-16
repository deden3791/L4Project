import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import { alpha, styled } from '@mui/material/styles';

interface ToggleSwitchProps {
  defaultChecked?: boolean;
  onChange?: (isChecked: boolean) => void;
}

// Define a custom styled component
const CustomSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#c49175',
    '&:hover': {
      backgroundColor: alpha('#c49175', theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#c49175',
  },
}));

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ defaultChecked = false, onChange }) => {
  const [isChecked, setChecked] = useState(defaultChecked);

  const handleToggle = () => {
    const newCheckedState = !isChecked;
    setChecked(newCheckedState);
    if (onChange) {
      onChange(newCheckedState);
    }
  };

  return (
    <CustomSwitch
      checked={isChecked}
      onChange={handleToggle}
      inputProps={{ 'aria-label': 'Toggle Switch' }}
    />
  );
};

export default ToggleSwitch;