import * as React from 'react'
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

export default function DatePickers(props) {
   // const {value} = React.useState(new Date());
   // value = value.
    const { label, name, size , onChange, value, textValue} = props

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label={label}
            value={value}
            size={size}
            name={name}
            onChange={onChange}
            // onChange={(newValue) => {
            //   setValue({newValue});
            //   console.log(newValue);
            // }}disableFuture
            format="MM/dd/yyyy"
            views={['year', 'month', 'day']}
            renderInput={(params) => <TextField {...params} size="small" value={textValue} />}
          />
        </LocalizationProvider>
        
    )
}
