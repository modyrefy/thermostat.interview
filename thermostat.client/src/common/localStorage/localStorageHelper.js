

const LocalStorageSet=(name,value)=>{
    localStorage.setItem(name,value);
};
const LocalStorageGet=(name)=>{
    return  localStorage.getItem(name);
};
const LocalStorageClear=(name)=>{
    if(name===null|| name===undefined|| name==='')
    {localStorage.clear();}
    else
    {localStorage.removeItem(name);}
};

export {LocalStorageSet,LocalStorageGet,LocalStorageClear};