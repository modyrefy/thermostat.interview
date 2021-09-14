import React, {useEffect, useState} from "react";
import LoadingBox from "../box/loadingBox";
import {filterByDate, getDevicesTemperatures, saveDevice} from "../../serviceBroker/deviceServiceBroker";
import {
    Table,
    TableBody,
    TableHead,
    TableRow,
    Paper,
    TableContainer,
    TableCell,
    Grid,
    Avatar,
    TextField, Button
} from "@material-ui/core";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {makeStyles} from "@material-ui/core/styles";
import {useFormik} from "formik";
import * as Yup from "yup";
var dateFormat = require("dateformat");

const useStyles = makeStyles({
    table: {
        minWidth: 600,
        //maxWidth:600,
    },
});

const initialValues = {
    fromDate: '',
    toDate:'' ,
};

const paperStyle = {
    padding: 20,
    height: "40vh",
    width: 280,
    margin: "20px auto",
    align:"left"
};

const avatarStyle = { backgroundColor: "#1bbd7e" };
const btnStyle = { margin: "8px 0" };

export function TransactionReport(props){
    const classes = useStyles();
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fromDate, setFromDate] = React.useState();
    const [toDate, setToDate] = React.useState();
    const [validationSchema,setValidationSchema] =React.useState( Yup.object({
        fromDate: Yup.date().required("from Date is required"),
        toDate: Yup.date().required("to Date is required.")
    }));

    const searchHandler = async (values) => {
        try {
            setLoading(true)
            const request= {
                ...values
            };
            console.log(request.fromDate);
            console.log(dateFormat(request.fromDate,"mm/dd/yyyy"))
            filterByDate(
                dateFormat(request.fromDate,"mm/dd/yyyy"),
                dateFormat(request.toDate,"mm/dd/yyyy")
            ).then(res=>{
                console.log('xxxxxxxxxxx')
                setResult(res !== null && res.response !== null && res.response.length !== 0 ? res.response : null);
                setLoading(false);
               // formik.setValues({...initialValues})
            }).catch(err=>{
                setLoading(false);
            });
        }
        catch (err) {
            setLoading(false);
            console.log(err);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: searchHandler,
    })


    return(
        <React.Fragment>
            {loading && <LoadingBox/>}
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                <Grid>
                    <form onSubmit={formik.handleSubmit}>
                        <table>
                            <tr>
                                <td>
                                    <TextField
                                        format={'MM/dd/yyyy'}

                                        label="from Date"
                                        id="fromDate"
                                        name="fromDate"
                                        placeholder="Enter from Date"
                                        type="date"
                                        value={fromDate}

                                        onChange={(event) => {
                                            setFromDate(event.target.value)
                                        }}
                                        error={formik.touched.fromDate && Boolean(formik.errors.fromDate)}
                                        helperText={formik.touched.fromDate && formik.errors.fromDate}
                                        //required
                                        fullWidth
                                        {...formik.getFieldProps('fromDate')}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </td>
                                <td>
                                    <TextField
                                        label="to Date"
                                        id="toDate"
                                        name="toDate"
                                        placeholder="Enter to Date"
                                        type="date"
                                        value={toDate}

                                        onChange={(event) => {
                                            setFromDate(event.target.value)
                                        }}
                                        error={formik.touched.toDate && Boolean(formik.errors.toDate)}
                                        helperText={formik.touched.toDate && formik.errors.toDate}
                                        //required
                                        fullWidth
                                        {...formik.getFieldProps('toDate')}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </td>
                                <td colSpan={2}>
                                    <Button
                                        type="submit"
                                        color="primary"
                                        variant="contained"
                                        style={btnStyle}
                                        fullWidth
                                    >
                                        Search
                                    </Button>
                                </td>
                            </tr>
                        </table>
                    </form>
                </Grid>
                </Table>
            </TableContainer>
            {result !=null && result.length!=0 &&
                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell></TableCell>
                            <TableCell>Device name</TableCell>
                            <TableCell align="right">Transaction Count</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {result.map((row, index) => (
                            <TableRow key={row.id.toString()}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell  component="th" scope="row" >
                                    {row.description}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.deviceName}
                                </TableCell>
                                <TableCell align="right">{row.transactionCount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            }
        </React.Fragment>
    );
};