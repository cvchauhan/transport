import React, { useRef } from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core';
import Controls from '../form-controls/Controls';
import * as Icons from '@mui/icons-material';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(0)
    },
    dialogTitle: {
        paddingRight: '0px'
    }
}))

export default function Popup(props) {
    const dialogBox = useRef()
    const { title, children, openPopup, setOpenPopup } = props;
    const classes = useStyles();

    return (
        <Dialog ref={dialogBox} open={openPopup} maxWidth="md" disableEnforceFocus classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex', margin: 0 }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <Controls.ActionButton
                        onClick={()=>{setOpenPopup(false)}}
                        >
                        <Icons.Close color="error"/>
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
}
