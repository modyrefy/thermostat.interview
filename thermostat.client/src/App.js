import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {DeviceDetail} from "./component/device/deviceDetail"
import {DeviceTemperature} from "./component/device/deviceTemperature";
import {BrowserRouter,Route,Link,withRouter} from "react-router-dom";
import {TransactionReport} from "./component/device/transactionReport";


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
                <Link to="/">Devices List</Link>
                <br/>
                <Link to="/temperature">Temperatures</Link>
                <br/>
                <Link to="/report">Report</Link>
                <br/>
                <br/>
                <br/>
                <Route path="/report" exact component={TransactionReport}/>
                <Route path="/temperature" exact component={DeviceTemperature}/>
                <Route path="/" exact component={DeviceDetail}/>
            </BrowserRouter>
        </div>
    );
}

export default App;
