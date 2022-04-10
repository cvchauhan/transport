import React from 'react'
import { makeStyles } from "@material-ui/core";
import * as Mat from "@mui/material";


const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(7.5)
    },
    label: {
        textTransform: 'none'
    }
}))

export default function Button(props) {

    const { text, size, color, variant, onClick, ...other } = props
    const classes = useStyles();

    return (
        <Mat.Button
            variant={variant || "contained"}
            size={size}
            color={color}
            onClick={onClick}
            {...other}
            classes={{ root: classes.root, label: classes.label }}>
            {text}
        </Mat.Button>
    )
}
