import React, {useEffect, useRef, useState} from "react";
import LoadingBox from "../box/loadingBox";
import {deleteDevice, getAllDevices, saveDevice} from "../../serviceBroker/deviceServiceBroker";
import {
    Table,
    TableBody,
    TableHead,
    TableRow,
    Paper,
    TableContainer,
    TableCell,
    Dialog,
    DialogContent, Button
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import {ConfirmBox} from "../box/confirmBox";
import {DeviceRegisteration} from "./deviceRegisteration";
import {useFormik} from "formik";
import * as Yup from "yup";
import io from 'socket.io-client';
import {SocketBox} from "../socket/socket";
import {MenuItem} from "../menu/menu";

const useStyles = makeStyles({
    table: {
        minWidth: 600,
        maxWidth:800,
    },
});
const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

export function DeviceDetail(props){

    const classes = useStyles();
    //const [result, setResult] = useState([]);
    const result = useRef([]);
    const [loading, setLoading] = useState(false);
    const [socket, setSocket] = useState(null);
    const [open,setOpen]=useState(false);
    const [modelPopupOpen,setModelPopupOpen]=useState(false);
    const[deleteDeviceId,setDeleteDeviceId]=useState(null);
    const [validationSchema,setValidationSchema] =React.useState( Yup.object({
        deviceName: Yup.string().required("device Name is required"),
        deviceType: Yup.string().required("device type is required.")
    }));
    const initialValues = {
        deviceName: '',
        deviceType:'' ,
        id:''
    };
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    const submitHandler = async (values) => {
        try {
            setLoading(true)
            const request= {
                ...values
            };
            saveDevice(request).then(res=>{
               // console.log(res);
                setLoading(false);
                setModelPopupOpen(false);
                formik.setValues({...initialValues})

            }).catch(err=>{
                setLoading(false);
            });
        }
        catch (err) {
            console.log(err);
        }
    };
    const handlePopupClose=()=>{
        setModelPopupOpen(false);
        formik.setErrors({});
        formik.setValues({...initialValues});
    };
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: submitHandler,
    })
    const handleEditClick = (values) => {
        setModelPopupOpen(true);
        formik.setValues({...values});
    };
    const handleDeleteClick = (event) => {
        setDeleteDeviceId(event.currentTarget.value)
        setOpen(true);
    };
    const handleCloseConfirmBoxClick = (event) => {
       setOpen(false);
    };
    const handleDeleteConfirmBoxClick=(event)=> {
        setLoading(true);
        setOpen(false);
        deleteDevice(deleteDeviceId).then(res => {
            setLoading(false);
            setDeleteDeviceId(null);
        }).catch(err => {
            console.log('error ' + err.message)
            setLoading(false);
        });
    };
    const loadDataFromSocket=async(message)=>{
        const request = JSON.parse(message);
        if(request !=null && request.message !=null) {
            setLoading(true);
            //await delay(1000)
            //console.log('socket action type ' + request.message.actionType);
            switch (request.message.actionType)
            {
                case 1: // add row
                    //console.log('row addes');
                    result.current.splice(0,0,request.message);
                    break;
                case 2:// update row
                    let editItem=result.current.find(p=>p.id===request.message.id);
                    if(editItem!=null)
                    {
                        let editIndex=result.current.indexOf(editItem);
                        result.current.splice(editIndex,1);
                        result.current.splice(0,0,request.message);
                    }
                    else {
                       // console.log('not able tp get edit item');
                    }
                    break;
                case 3: // delete row
                    let deleteItem=result.current.find(p=>p.id===request.message.id);
                    if(deleteItem!=null)
                    {
                        let deleteIndex=result.current.indexOf(deleteItem);
                        //console.log('edit item ' + JSON.stringify(deleteIndex));
                       // console.log('edit item item' + deleteIndex);
                        result.current.splice(deleteIndex,1);
                    }
                    break;
                default:
                    // do nothing
                    break;
            }
            setLoading(false);
        }
    }
    useEffect(()=>{
        console.log('REACT_APP_SOCKET_DEVICE_URL ' +process.env.REACT_APP_SOCKET_DEVICE_URL);
        console.log('REACT_APP_SOCKET_TEMPERATURE_URL ' +process.env.REACT_APP_SOCKET_TEMPERATURE_URL);
        console.log('REACT_APP_SOCKET_DEVICE_EVENT_NAME ' +process.env.REACT_APP_SOCKET_DEVICE_EVENT_NAME);
        console.log('REACT_APP_SOCKET_TEMPERATURE_EVENT_NAME ' +process.env.REACT_APP_SOCKET_TEMPERATURE_EVENT_NAME);
        let loadData=()=>
        {
            setLoading(true);
            getAllDevices().then(res=>{
                if(res !== null && res.response !== null && res.response.length !== 0 )
                {
                    result.current = [...res.response];
                }
                setLoading(false);
            }).catch(err=>{
                setLoading(false);
            });
        }
        loadData();
        return () => { loadData = null;}
    },[]);
    useEffect(() => {
        const newSocket = io(process.env.REACT_APP_SOCKET_DEVICE_URL);
        setSocket(newSocket);
        //console.log('window.REACT_APP_SOCKET_DEVICE_URL'+ window.REACT_APP_SOCKET_DEVICE_URL)
        return () => newSocket.close();
    },[setSocket]);

    const registrationProps = {...props, formik, initialValues}
    return(
<React.Fragment>
    <MenuItem />
    { socket &&  <SocketBox socket={socket}
                             eventName={process.env.REACT_APP_SOCKET_DEVICE_EVENT_NAME}
                            notificationMessage='devices  rows updated'
                            doAction={loadDataFromSocket}/>}
    <Button variant="contained" color="primary" onClick={() => { setModelPopupOpen(true)}}>Add new device</Button>
    {open && <ConfirmBox open={open}
                         message='Are You Sure U want to delete Device??!!!!'
                         handleClose={handleCloseConfirmBoxClick}
                         handleConfirm={handleDeleteConfirmBoxClick}/>}
    {loading && <LoadingBox/>}
    <Dialog  fullWidth={true}
             onClose={handlePopupClose}
             aria-labelledby="customized-dialog-title" open={modelPopupOpen}>
        <DialogContent dividers>
            <DeviceRegisteration {...registrationProps} />
        </DialogContent>

    </Dialog>
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
                    {result.current.map((row, index) => (
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
                                    onClick={() => handleEditClick(row)}
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
