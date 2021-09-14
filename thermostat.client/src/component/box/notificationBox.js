import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import {Alert} from "@material-ui/lab";
export function NotificationBox({open,message,vertical, horizontal, handleClose}) {
   return( <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        //message={message}
        key={vertical + horizontal}
    >
       <Alert onClose={handleClose} severity="success">
           {message}
       </Alert>
   </Snackbar>);
};
