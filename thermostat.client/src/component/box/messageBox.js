import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import {configureStore} from "@reduxjs/toolkit";

function MessageBox({errors,severity,variant}) {
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
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
                    <br/>
                    {errors.map(error =>(
                        <ul >
                            <li>{error.message}</li>
                        </ul>
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
