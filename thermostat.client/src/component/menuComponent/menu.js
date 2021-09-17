import * as React from 'react';
import { useHistory,Link } from "react-router-dom";


import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

export  const  MenuComponent=(props)=>{
    let history = useHistory();

    const [anchorEl, setAnchorEl] = React.useState(null)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleMenuItemClick = (path) => {

        history.push(path);
    };
    return(
        <div>
        {/*<table>*/}
        {/*    <tr>*/}
        {/*        <td>*/}
        {/*            <Link to="/device">Devices List</Link>*/}
        {/*        </td>*/}
        {/*        <td>*/}
        {/*            <Link to="/temperature">Temperatures</Link>*/}
        {/*        </td>*/}
        {/*        <td>*/}
        {/*            <Link to="/report">Report</Link>*/}
        {/*        </td>*/}
        {/*    </tr>*/}
        {/*</table>*/}

            {/*<Segment inverted>*/}
            {/*    <Menu  inverted secondary>*/}
            {/*        <Menu.Item*/}
            {/*            name='Devices11'*/}
            {/*            active={activeItem === 'device'}*/}
            {/*            onClick={()=>handleItemClick('device')}*/}
            {/*        />*/}
            {/*        <Menu.Item*/}
            {/*            name='Temperature'*/}
            {/*            active={activeItem === 'temperature'}*/}
            {/*            onClick={()=>handleItemClick('temperature')}*/}
            {/*        />*/}
            {/*        <Menu.Item*/}
            {/*            name='Report'*/}
            {/*            active={activeItem === 'report'}*/}
            {/*            onClick={()=>handleItemClick('report')}*/}
            {/*        />*/}
            {/*    </Menu>*/}
            {/*</Segment>*/}


            <Button  aria-controls="customized-menu"
                     aria-haspopup="true"
                     variant="contained"
                     color="primary"
                     onClick={handleClick}>
                Open Menu
            </Button>


            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem>
                    <ListItemText onClick={()=>{handleMenuItemClick('/device')}} primary="Device" />
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemText onClick={()=>{handleMenuItemClick('/temperature')}} primary="Temperature" />
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemText onClick={()=>{handleMenuItemClick('/report')}} primary="Report" />
                </StyledMenuItem>
            </StyledMenu>


            {/*    <Menu*/}
            {/*        id="simple-menu"*/}
            {/*        anchorEl={anchorEl}*/}
            {/*        keepMounted*/}
            {/*        open={Boolean(anchorEl)}*/}
            {/*        onClose={handleClose}*/}
            {/*    >*/}
            {/*        <MenuItem onClick={()=>handleMenuItemClick('/device')}>Device</MenuItem>*/}
            {/*        <MenuItem onClick={()=>handleMenuItemClick('/temperature')}>Temperature</MenuItem>*/}
            {/*        <MenuItem onClick={()=>handleMenuItemClick('/report')}>Report</MenuItem>*/}
            {/*    </Menu>*/}

            <br/>
            <br/>
            <br/>

        </div>
    );

};