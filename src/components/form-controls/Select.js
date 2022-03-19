import React from 'react'
import * as Mat from '@mui/material';
export default function Select(props) {

    const { name, label, value, error=null, onChange, options } = props;

    return (
        <Mat.FormControl variant="outlined"
        {...(error && {error:true})}>
            <Mat.InputLabel>{label}</Mat.InputLabel>
            <Mat.Select
                label={label}
                name={name}
                value={value}
                size="small"
                onChange={onChange}>
                <Mat.MenuItem value="">None</Mat.MenuItem>
                {
                    options.map(
                        item => (<Mat.MenuItem key={item.id} value={item.id}>{item.title}</Mat.MenuItem>)
                    )
                }
            </Mat.Select>
            {error && <Mat.FormHelperText>{error}</Mat.FormHelperText>}
        </Mat.FormControl>
    )
}
