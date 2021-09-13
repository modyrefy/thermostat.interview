import React, {useEffect, useState} from "react";
import LoadingBox from "../box/loadingBox";
import {deleteDevice, getAllDevices} from "../../serviceBroker/deviceServiceBroker";
import {Table, TableBody, TableHead, TableRow, Paper, TableContainer, TableCell} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import {ConfirmBox} from "../box/confirmBox";
import {DeviceRegisteration} from "./deviceRegisteration";
const useStyles = makeStyles({
    table: {
        minWidth: 400,
        maxWidth:600,
    },
});

function DeviceDetail(){

    const classes = useStyles();
    let rowNumber =0;
    const [result, setResult] = useState(0);
    const [loading, setLoading] = useState(false);
    const [open,setOpen]=useState(false);
    const[deviceId,setDeviceId]=useState(null);
    const[deleteDeviceId,setDeleteDeviceId]=useState(null);
    const handleEditClick = (event) => {
        console.log(event.currentTarget.value)
        setDeviceId(event.currentTarget.value)
    };
    const handleDeleteClick = (event) => {
        setDeleteDeviceId(event.currentTarget.value)
        setOpen(true);
    };
    const handleCloseConfirmBoxClick = (event) => {
       setOpen(false);
    };
    const handleDeleteConfirmBoxClick=(event)=>{

        setLoading(true);
       setOpen(false);
       deleteDevice(deleteDeviceId).then(res=>{
           setLoading(false);
           setDeleteDeviceId(null);
           loadData();
       }).catch(err=>{
           console.log('error '+err.message)
           setLoading(false);
       });
    };

    const loadData=()=>
    {
        setLoading(true);
        getAllDevices().then(res=>{
            setResult(res !== null && res.response !== null && res.response.length !== 0 ? res.response : null);
            setLoading(false);
        }).catch(err=>{
            setLoading(false);
        });

    }
    useEffect(()=>{
        loadData();
    },[]);
    return(
<React.Fragment>
    {open && <ConfirmBox open={open}
                         message='Are You Sure U want to delete Device??!!!!'
                         handleClose={handleCloseConfirmBoxClick}
                         handleConfirm={handleDeleteConfirmBoxClick}/>}
    {loading && <LoadingBox/>}
    <DeviceRegisteration />
    {
        result &&
        <TableContainer component={Paper} >
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Id</TableCell>
                        <TableCell>Device name</TableCell>
                        <TableCell align="right">Device Type</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {result.map((row, index) => (
                        <TableRow key={row.id.toString()}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{row.id.toString()}</TableCell>
                            <TableCell component="th" scope="row">
                                {row.deviceName}
                            </TableCell>
                            <TableCell align="right">{row.deviceType}</TableCell>
                            <TableCell align="right">
                                <IconButton
                                    color="inherit"
                                    className={classes.textPrimary}
                                    size="small"
                                    aria-label="edit"
                                    value={row.id.toString()}
                                    id={row.id.toString()}
                                    name={row.id.toString()}
                                    onClick={handleEditClick}
                                >
                                    <EditIcon   fontSize="small" />
                                </IconButton>
                            <IconButton
                                color="inherit"
                                size="small"
                                aria-label="delete"
                                value={row.id.toString()}
                                id={row.id.toString()}
                                name={row.id.toString()}
                                onClick={handleDeleteClick}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    }
</React.Fragment>
    );
};
export  default DeviceDetail;