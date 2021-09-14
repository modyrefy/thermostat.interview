
import DeviceDetail from "./component/device/deviceDetail"
import {DeviceTemperature} from "./component/device/deviceTemperature";
import {BrowserRouter,Route} from "react-router-dom";


function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Route path="/device"  component={DeviceDetail} />
            <Route path="/device/temperature"  component={DeviceTemperature} />
        </BrowserRouter>
        <DeviceDetail/>
    </div>
  );
}

export default App;
