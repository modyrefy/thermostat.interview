import * as  UserRepository from "../repository/userRepository";
import {UserDto} from "../model/uiModel/userDto";

export const authenticateUser = async (item: UserDto) => {
    return  await  UserRepository.authenticateUser(item);
};

export const createRow = async (item: UserDto) => {
    return  await  UserRepository.createRow(item);
};