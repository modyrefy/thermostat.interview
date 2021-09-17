import React from 'react';
import {DeviceDetail} from "./component/device/deviceDetail"
import {DeviceTemperature} from "./component/device/deviceTemperature";
import {BrowserRouter,Route,Link,withRouter} from "react-router-dom";
import {TransactionReport} from "./component/device/transactionReport";
import {LoginForm} from "./component/authincation/loginForm";
import AuthenticatedRoute from "./component/route/authenticatedRoute";


function App() {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div className="App">
            <BrowserRouter>

                <AuthenticatedRoute path="/report" exact component={TransactionReport}/>
                <AuthenticatedRoute path="/temperature" exact  component={DeviceTemperature}/>
                <AuthenticatedRoute path="/device" exact  component={DeviceDetail}/>
                <Route path="/" exact component={LoginForm}/>
            </BrowserRouter>
        </div>
    );
}

export default App;
