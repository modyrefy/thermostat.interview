import React, {useEffect, useState} from "react";
import * as Yup from "yup"
import {Formik,Form,Field} from "formik";
import {Avatar, Grid, Paper,TextField,Button} from "@material-ui/core";
import {saveDevice} from "../../serviceBroker/deviceServiceBroker";
import LoadingBox from "../box/loadingBox";
export function DeviceRegisteration(){
    const initialValues = {
        deviceName: null,
        deviceType:null ,
        id:null,
    };
    useEffect(()=>{

    },);
    //const clearControls=()=>{};
    const [validationSchema,setValidationSchema] =React.useState( Yup.object({
        deviceName: Yup.string().required("device Name is required"),
        deviceType: Yup.string().required("device type is required.")
    }));
    const [loading, setLoading] = useState(false);
   // const [deviceId,setDeviceId]=useState(null);
    const paperStyle = {
        padding: 20,
        height: "40vh",
        width: 280,
        margin: "20px auto",
        align:"left"
    };

    const avatarStyle = { backgroundColor: "#1bbd7e" };
    const btnStyle = { margin: "8px 0" };

    const submitHandler = async (data,{setSubmitting, setErrors, setStatus, resetForm}) => {
        try {
            setLoading(true)
            var request= {
                deviceName:data.deviceName,
                deviceType:data.deviceType,
              id:null
            };
            saveDevice(request).then(res=>{
                setLoading(false);
                resetForm({})
                setStatus({success: true})
            }).catch(err=>{
                setLoading(false);
                setStatus({success: false})
                setSubmitting(false)
                setErrors({submit: err.message})
            });
        }
        catch (err) {
            console.log(err);
        }
    };

    return(
        <React.Fragment>
            {loading && <LoadingBox/>}
                <Paper elevation={10} style={paperStyle}>
                    <Grid>
                        <Avatar style={avatarStyle} />
                        <h2>Device Registration</h2>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={submitHandler}
                        >
                            {({ touched, errors, isSubmitting, handleChange }) => (
                                <Form>
                                    <table>
                                        <tr>
                                            <td>
                                                <Field
                                                    as={TextField}
                                                    label="Device Name"
                                                    id="deviceName"
                                                    name="deviceName"
                                                    placeholder="Enter device Name"
                                                    onChange={handleChange}
                                                    //required
                                                    fullWidth
                                                    error={touched.deviceName && Boolean(errors.deviceName)}
                                                    helperText={touched.deviceName && errors.deviceName}
                                                />
                                            </td>
                                            <td>
                                                <Field
                                                    as={TextField}
                                                    label="Device Type"
                                                    id="deviceType"
                                                    name="deviceType"
                                                    placeholder="Enter device Type"
                                                    onChange={handleChange}
                                                    //required
                                                    fullWidth
                                                    error={touched.deviceType && Boolean(errors.deviceType)}
                                                    helperText={touched.deviceType && errors.deviceType}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>
                                                <Button
                                                    type="submit"
                                                    color="primary"
                                                    variant="contained"
                                                    style={btnStyle}
                                                    fullWidth
                                                >
                                                    Save
                                                </Button>
                                            </td>
                                        </tr>
                                    </table>
                                </Form>
                            )}
                        </Formik>
                    </Grid>
                </Paper>
        </React.Fragment>
    );
};