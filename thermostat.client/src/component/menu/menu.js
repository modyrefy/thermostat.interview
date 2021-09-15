import {Link} from "react-router-dom";
import React from "react";

export  const  MenuItem=(props)=>{
    return(
        <div>
        <table>
            <tr>
                <td>
                    <Link to="/device">Devices List</Link>
                </td>
                <td>
                    <Link to="/temperature">Temperatures</Link>
                </td>
                <td>
                    <Link to="/report">Report</Link>
                </td>
            </tr>
        </table>
            <br/>
            <br/>
            <br/>
        </div>
    );

};