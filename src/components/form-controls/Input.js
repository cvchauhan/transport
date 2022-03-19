import React from 'react'
import * as Mat from '@mui/material';

export default function Input(props) {

    const { name, type, size, label, value, error=null, placeholder, defaultValue, InputProps, onChange } = props;

    return (
        <Mat.TextField
            variant="outlined"
            size="small"
            fullWidth
            label={label}
            name={name}
            type={type}
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
