import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();
export default function AutoComplete(props) {

  const { label, name, filterOptions, PaperComponent, id, options, onChange } = props

  return (
    <Autocomplete
      disablePortal
      id={id}
      size="small"
      name={name}
      options={options}
      filterOptions={filterOptions}
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
