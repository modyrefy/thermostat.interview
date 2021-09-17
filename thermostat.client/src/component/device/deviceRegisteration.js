import React, {useEffect, useState} from "react";
import {Avatar, Grid, Paper,TextField,Button} from "@material-ui/core";
import LoadingBox from "../box/loadingBox";

export function DeviceRegisteration(props){
    const {formik} = props;
    const [loading, setLoading] = useState(false);
    const paperStyle = {
        padding: 20,
        height: "40vh",
        width: 280,
        margin: "20px auto",
        align:"left"
    };

    const avatarStyle = { backgroundColor: "#1bbd7e" };
    const btnStyle = { margin: "8px 0" };

    return(
        <React.Fragment>
            {loading && <LoadingBox/>}
                {/*<Paper elevation={10} style={paperStyle}>*/}
                    <Grid>
                        {/*<Avatar style={avatarStyle} />*/}
                        <h2>Device Registration</h2>
                        <form onSubmit={formik.handleSubmit}>
                            <table>
                                <tr>
                                    <td>
                                        <TextField
                                            style={{width:500}}
                                            label="Device Name"
                                            id="deviceName"
                                            name="deviceName"
                                            placeholder="Enter device Name"
                                            error={formik.touched.deviceName && Boolean(formik.errors.deviceName)}
                                            helperText={formik.touched.deviceName && formik.errors.deviceName}
                                            //required
                                            fullWidth
                                            {...formik.getFieldProps('deviceName')}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <TextField
                                            style={{width:500}}
                                            label="Device Type"
                                            id="deviceType"
                                            name="deviceType"
                                            placeholder="Enter device Type"
                                            error={formik.touched.deviceType && Boolean(formik.errors.deviceType)}
                                            helperText={formik.touched.deviceType && formik.errors.deviceType}
                                            //required
                                            fullWidth
                                            {...formik.getFieldProps('deviceType')}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3}>
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
                        </form>
                    </Grid>
                {/*</Paper>*/}
        </React.Fragment>
    );
};