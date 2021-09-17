import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import {configureStore} from "@reduxjs/toolkit";
import {AlertTitle} from "@material-ui/lab";

function MessageBox({errors,severity,variant}) {
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '50%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
    }));

    const classes = useStyles();
    const variantValue=variant===null||variant===undefined?"outlined":{variant};
    if(errors!=null && errors.length!=0) {
        return (
            <div id="messageListDiv" >
                <Alert  severity={severity}>
                    {errors.map(error =>(
                        <React.Fragment>
                            {error.message}
                            <br/>
                        </React.Fragment>
                    ))}
                </Alert>
                {/*{errors.map(error =>(
                    <Alert  variant={variantValue} severity={severity}>
                        {error.ErrorMessageEn}
                    </Alert>
                ))}*/}
        </div>
        );

    }

}

export default MessageBox;
