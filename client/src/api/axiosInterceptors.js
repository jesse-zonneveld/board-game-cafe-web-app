import axiosInstance from "./axiosAPI";
import { refreshToken } from "../redux/actions/authActions";

const setup = (store) => {
    const { dispatch } = store;

    axiosInstance.interceptors.request.use(
        (config) => {
            console.log("inside axios request config incerceptor");

            // Get access token here

            return config;


        }, (err) => {
            console.log("inside axios request err incerceptor");
            return Promise.reject(err);
        }
    );

    axiosInstance.interceptors.response.use(
        (res) => {
            console.log("inside axios response res incerceptor");
            return res;
        }, async (err) => {
            const originalConfig = err.config;

            console.log("inside axios response err incerceptor");
            console.log(err.response.data.errors, originalConfig._retry);

            if (err.response.data.errors['authorization'] == 'jwt expired' && !originalConfig._retry) {
                originalConfig._retry = true;
                
                try {
                    console.log("refresh this token");
                    await dispatch(refreshToken());
                    console.log("~~~~refreshed this token~~~");
                    return axiosInstance(originalConfig);
                } catch (error) {
                    console.log("caught error", error)
                    return Promise.reject(error);
                }
            }
            
            return Promise.reject(err);
        }
    );
}

export default setup;