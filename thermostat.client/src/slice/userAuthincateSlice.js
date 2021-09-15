import { createSlice } from "@reduxjs/toolkit";
import * as Cookies from "js-cookie";
import deviceAxiosApiInstance from "../axios/devicAxiosExtension";


const slice = createSlice({
    name: "UserAuthenticate",
    initialState: {
        userAccount: null,
        isLoading: false,
        isAuthenticated: false,
        Errors: []
    },
    reducers: {
        setLoading: (state, action) => {
            return {
                ...state,
                isLoading: action.payload,
            }
        },
        setAuthenticateSuccess: (state, action) => {
            const{response,token,remember}=action.payload;
            return {
                ...state,
                userAccount: response,//action.payload,
                isLoading: false,
                isAuthenticated: true,
                Errors: [],
            };
        },
        setAuthenticateFailed: (state, action) => {
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                Errors: action.payload,
            };
        },
        setAuthenticationReset:(state,action)=>{
            return {
                ...state,
                userAccount: null,
                isLoading: false,
                isAuthenticated: false,
                Errors: [],
            };
        },
    }
});

export default slice.reducer;
const { setLoading, setAuthenticateSuccess, setAuthenticateFailed,setAuthenticationReset } = slice.actions;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export const authincateUser = (obj) => async (dispatch, getState) => {
    try {
        dispatch(setLoading(true));
        await sleep(2000);
        const params = {...obj};
        var apiRespopnse = await deviceAxiosApiInstance.post("user/authenticate", params);
        console.log('apiRespopnse',apiRespopnse)
        if (apiRespopnse != null ) {
            dispatch( setAuthenticateSuccess(
                {
                    response: apiRespopnse.Response,
                    remember: obj.remember,
                    //token:apiRespopnse.Token
                }));
        } else {
           // alert( JSON.stringify(apiRespopnse));
            dispatch(setAuthenticateFailed(apiRespopnse.Errors));
        }
    } catch (err) {
        dispatch(setAuthenticateFailed([
            {
                message: err.message,
            },
        ]));
    } finally {
        // dispatch(setLoading(false));
    }
};
export  const resetAuthenticateUser=()=>async (dispatch,getstate)=>{
    dispatch(setAuthenticationReset());
};