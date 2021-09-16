import {UserModel} from "../model/dbModel/userModel";
import {UserDto} from "../model/uiModel/userDto";

export const authenticateUser = async (item: UserDto) => {
    var result = await UserModel.find(
        {isActive: true, userName: item.userName, password: item.password});
    if (result != null && result.length !=0) {
        return  new UserDto(item.userName,'****',result[0]._id);
    }
    return null;
};

export const createRow = async (item: UserDto) => {
    if (item != null) {
        var request = new UserModel();
        request.userName = item.userName;
        request.password = item.password
        var response = await UserModel.create(item);
        if (response != null) {
            item.id = response._id;
            return item;
        }
        return null;
    }
};

export  const createDummyUser =async (item: UserDto) => {
    if (item != null) {
        UserModel.find({userName: item.userName, password: item.password}).then((res: any) => {
            if (res === null || res === undefined) {
                var request = new UserModel();
                request.userName = item.userName;
                request.password = item.password
                UserModel.create(request);
                console.log(`new dummy user created ${item.id}`);
            }
        }).catch(err => {
            console.log('error in create dummy user ' + err.message);
        });
        return null;
    }
}
