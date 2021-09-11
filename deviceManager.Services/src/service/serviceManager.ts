const axios = require('axios');

export const isDeviceExist=async ()=> {
    try {
        const id = process.env.DEVICE_ID as string
        const deviceApiUrl = `${process.env.DEVICE_API_URL}/api/device/${id}` as string;
console.log(deviceApiUrl)
        var result = await axios.get(deviceApiUrl);
        console.log('result' + JSON.stringify(result.data));
        return result != null && result.data !=null&& result.data.response != null ? true : false;
    }catch (err:any)
    {
        console.log('device error -' +err.message)

    }
};
