import React, {useEffect, useRef, useState} from "react";
import LoadingBox from "../box/loadingBox";
import { getDevicesTemperatures} from "../../serviceBroker/deviceServiceBroker";
import {Table, TableBody, TableHead, TableRow, Paper, TableContainer, TableCell} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import io from 'socket.io-client';
import {SocketBox} from "../socket/socket";
import {MenuItem} from "../menu/menu";
var dateFormat = require("dateformat");
const useStyles = makeStyles({
    table: {
        minWidth: 600,
        //maxWidth:600,
    },
});

export function DeviceTemperature(props){
    const classes = useStyles();
   // const [result, setResult] = useState([]);
    const result = useRef([]);
    const [loading, setLoading] = useState(false);
    const [socket, setSocket] = useState(null);
    console.log('Result', result.current);
    const loadDataManually=(message)=>
    {
        console.log('Result Inside', result.current);
        const request = JSON.parse(message);
        if(request !=null && request.message !=null) {
            setLoading(true);
            result.current.pop();
           result.current.splice(0,0,request.message);
            setLoading(false);
        }
    };

    useEffect(()=>{
        //loadData();

        let loadData=()=>
        {
            setLoading(true);
            getDevicesTemperatures(5).then(res => {
                //setResult(res !== null && res.response !== null && res.response.length !== 0 ? res.response : null);
                if(res !== null && res.response !== null && res.response.length !== 0){
                   // setResult(res.response);
                    //setResult(res.response);
                    result.current = [...res.response];

                    console.log('Initial Response:', res.response);
                }

                //setResult(res !== null && res.response !== null && res.response.length !== 0 ? res.response : null);
                //alert('xxxxxx');
                setLoading(false);
            }).catch(err=>{
                setLoading(false);
            });

        }
        loadData();
        return () => { loadData = null;}
    },[]);

    useEffect(() => {

        // const newSocket = io(window.REACT_APP_SOCKET_URL);
        const newSocket = io(process.env.REACT_APP_SOCKET_TEMPERATURE_URL);
        setSocket(newSocket);
        console.log('Init Socket', newSocket)
        console.log(process.env.REACT_APP_SOCKET_TEMPERATURE_URL);
        // console.log(window.REACT_APP_SOCKET_URL);
        return () => newSocket.close();
    },[setSocket]);

    return(
        <React.Fragment>
            <MenuItem />
            {loading && <LoadingBox/>}

            { socket &&  <SocketBox socket={socket}
                                    // eventName={window.REACT_APP_SOCKET_TEMPERATURE_EVENT_NAME}
                                    eventName={process.env.REACT_APP_SOCKET_TEMPERATURE_EVENT_NAME}
                                    notificationMessage='devices temperatures rows updated'
                                    doAction={loadDataManually} />}
            {
                result &&
                <TableContainer component={Paper} >
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Id</TableCell>
                                <TableCell>Device name</TableCell>
                                <TableCell align="right">Device Temperature</TableCell>
                                <TableCell align="right">Created On</TableCell>
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
                                    <TableCell align="right">{row.temperature}</TableCell>
                                    <TableCell align="right">{dateFormat( row.createdOn, "dd/mm/yyyy, h:MM:ss TT")}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </React.Fragment>
    );
};