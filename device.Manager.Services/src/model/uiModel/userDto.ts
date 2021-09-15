import {AutoMap} from "@nartc/automapper";

export class UserDto {
    @AutoMap()
    userName: string;
    @AutoMap()
    password: string;
    @AutoMap()
    id?:string;

    constructor(_userName :string,_password:string,_id:string ) {
        this.userName = _userName;
        this.password=_password;
        this.id=_id;
    }
}
