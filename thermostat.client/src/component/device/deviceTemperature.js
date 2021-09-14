import React, {useEffect, useState} from "react";
import LoadingBox from "../box/loadingBox";
import { getDevicesTemperatures} from "../../serviceBroker/deviceServiceBroker";
import {Table, TableBody, TableHead, TableRow, Paper, TableContainer, TableCell} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import io from 'socket.io-client';
import {SocketBox} from "../socket/socket";
var dateFormat = require("dateformat");
const useStyles = makeStyles({
    table: {
        minWidth: 600,
        //maxWidth:600,
    },
});

export function DeviceTemperature(){
    const classes = useStyles();
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [socket, setSocket] = useState(null);
    const loadDataManually=(message)=>
    {
        result.slice(0,1);
        result.push(message);
        //messageList.pop();
        console.log(`new row added ` +JSON.stringify(result))
    };
    const loadData=()=>
    {
        setLoading(true);
        getDevicesTemperatures(100).then(res=>{
            setResult(res !== null && res.response !== null && res.response.length !== 0 ? res.response : null);
            setLoading(false);
        }).catch(err=>{
            setLoading(false);
        });

    }
    useEffect(()=>{
        loadData();
    },[])
    useEffect(() => {
        const newSocket = io(process.env.REACT_APP_SOCKET_URL);
        setSocket(newSocket);
        console.log(newSocket)
        return () => newSocket.close();
    },[setSocket]);

    return(
        <React.Fragment>
            {loading && <LoadingBox/>}

            { socket &&  <SocketBox socket={socket}
                                    eventName={process.env.REACT_APP_SOCKET_TEMPERATURE_EVENT_NAME}
                                    notificationMessage='devices temperatures rows updated'
                                    doAction={loadData}/>}
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
                            {result.map((row, index) => (
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