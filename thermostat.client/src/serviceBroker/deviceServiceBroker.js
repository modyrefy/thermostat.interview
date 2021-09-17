import deviceAxiosApiInstance from "../axios/devicAxiosExtension";
import {number} from "yup";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export const getAllDevices=async ()=> {
   // await sleep(3000);
    let url = 'device';
    return await deviceAxiosApiInstance.get(url).then(res=>{
        return res;
    }).catch(err=>{
        console.log('getAllDevice-error '+ err);
    });
};

export const filterByDate=async(fromDate,toDate)=>{
    let url = `device/filter/date?fromDate=${fromDate}&toDate=${toDate}`;
    console.log('filterByDate ' +url);
    return await deviceAxiosApiInstance.get(url).then(res=>{
        return res;
    }).catch(err=>{
        console.log('filterByDate-error '+ err);
    });
};

export const getDevicesTemperatures=async(count)=>{
    let url = `device/transaction/${count}`;
    return await deviceAxiosApiInstance.get(url).then(res=>{
        return res;
    }).catch(err=>{
        console.log('getDevicesTemperatures-error '+ err);
    });
};

export const deleteDevice=async(id)=>{
    let url = `device/delete/${id}`;
    return await deviceAxiosApiInstance.delete(url).then(res=>{
        return res;
    }).catch(err=>{
        console.log('deleteDevice-error '+ err);
    });
};

export const saveDevice=async(request)=>{

    let url='device/insert';
   // console.log(url + JSON.stringify(request));
    if(request.id !==null && request.id !==undefined && request.id!=='')
    {
        url=`device/update/${request.id}`;
        return await deviceAxiosApiInstance.put(url,request).then(res=>{
            return res;
        }).catch(err=>{
            console.log(`insert device error  ${err}`);
        });
    }
    else
    {
        url='device/insert';
        return await deviceAxiosApiInstance.post(url,request).then(res=>{
            return res;
        }).catch(err=>{
            console.log(`insert device error  ${err}`);
        });
    }


};
