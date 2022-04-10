import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function AutoComplete(props) {

  const { label, name, filterOptions, PaperComponent, id, options, onChange,value, disabled } = props  
  let abc = value;  
  return (
    <Autocomplete
      disablePortal
      id={id}
      size="small"
      name={name}
      defaultValue={abc}
      value={abc}
      options={options}
      filterOptions={filterOptions}
      getOptionDisabled={option => disabled ? true : false}
      PaperComponent={PaperComponent}
      onChange={onChange}
      renderInput={(params) => (
        <TextField 
          {...params} 
          name={name} 
          label={label}
          variant="outlined" 
        /> 
      )}
    />
  )
}
