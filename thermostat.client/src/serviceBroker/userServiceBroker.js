import deviceAxiosApiInstance from "../axios/devicAxiosExtension";


export const authenticateUser=async(request)=>{
    let url = `user/authenticate`;
    return await deviceAxiosApiInstance.post(url,request).then(res=>{
        return res;
    }).catch(err=>{
        console.log('authenticateUser-error '+ err);
    });

};
