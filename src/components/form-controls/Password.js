import React from 'react'
import * as Mat from '@mui/material';

export default function Password(props) {

    const { name, label, value, error=null, placeholder, defaultValue, InputProps, onChange } = props;

    return (
        <Mat.TextField
            variant="outlined"
            size="small"
            fullWidth
            label={label}
            name={name}
            type='password'
            error={error}
            placeholder={placeholder}
            defaultValue={defaultValue}
            InputProps={InputProps}
            value={value}
            onChange={onChange}
            {...(error && {error:true})}
        />
    )
}
