import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
function LoadingBox() {
    const useStyles = makeStyles((theme) => ({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }));

    const classes = useStyles();

    return (
        <React.Fragment>
            <Backdrop className={classes.backdrop} open={true}>
                <CircularProgress />
                <CircularProgress color="secondary" />
                <br/>
                <br/>
                Loading....
            </Backdrop>
        </React.Fragment>
    );
}

export default LoadingBox;
