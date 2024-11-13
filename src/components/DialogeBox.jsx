import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const DialogeBox = ({title,content,actions}) => {
    function SlideTransition(props) {
        return <Slide {...props} direction="up" />;
    }
    return (
        <>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={actions.close}>No</Button>
                <Button onClick={actions.sure}>Yes</Button>
            </DialogActions>
        </>
    )
}

export default DialogeBox