import * as  UserRepository from "../repository/userRepository";
import {UserDto} from "../model/uiModel/userDto";
import {moveMessagePortToContext} from "worker_threads";

export const authenticateUser = async (item: UserDto) => {
    return  await  UserRepository.authenticateUser(item);
};

export const createRow = async (item: UserDto) => {
    return  await  UserRepository.createRow(item);
};

export const createDummyUser= async (item: UserDto) => {
    return await UserRepository.createDummyUser(item);
};