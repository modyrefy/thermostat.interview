import {testPublisher} from "../service/listnerService";

console.log('tttttttttttttttttt')

const testAction=(a:string,b:string)=>{
    console.log(a+' '+b);
};
testPublisher('xxxxxxxxxxxxx',testAction);
