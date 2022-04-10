import React from 'react'
import * as Mat from '@mui/material';

export default function Input(props) {

    const { name, type, label, value, error=null, placeholder, defaultValue, InputProps, onChange, disabled } = props;

    return (
        <Mat.TextField
            variant="outlined"
            size="small"
            fullWidth
            label={label}
            disabled={disabled ? true: false}
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
