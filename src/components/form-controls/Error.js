import React from 'react'
import FormHelperText from '@mui/material/FormHelperText';
import { ErrorMessage } from 'formik';

export default function Error(props) {

    const { name } = props;

    return (
        <FormHelperText id="my-helper-text">
        	<ErrorMessage name={name} />
        </FormHelperText>
    )
}
