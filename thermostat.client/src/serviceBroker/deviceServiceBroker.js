import deviceAxiosApiInstance from "../axios/devicAxiosExtension";
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
export const deleteDevice=async(id)=>{
    let url = `device/delete`;
    var request ={id:id};
    return await deviceAxiosApiInstance.post(url,request).then(res=>{
        return res;
    }).catch(err=>{
        console.log('deleteDevice-error '+ err);
    });
};

export const saveDevice=async(request)=>{
    console.log('id ' + request.id);
    let url=request.id !==null && request.id !==undefined ? `device/update`:`device/insert`;
    console.log(url + JSON.stringify(request));
    return await deviceAxiosApiInstance.post(url,request).then(res=>{
        return res;
    }).catch(err=>{
        console.log('deleteDevice-error '+ err);
    });

};
