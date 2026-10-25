import type { User, UserLoginInput, UserLoginOutput, UserRegisterInput } from "../types/authLogin";
import { getAuthHeaders } from "./authHeaders";
import baseUrl from "./axiosInstance";

export const authLogin=async ( user: UserLoginInput)=>{
const res=await baseUrl.post<UserLoginOutput>("/auth/login",user);
return res.data;
}
export const authRegister=async ( user:UserRegisterInput)=>{
const res=await baseUrl.post<UserLoginOutput>("/auth/register",user);
return res.data;
}

export const authMe= async () => {
    const res = await baseUrl.get<User>("/auth/me", getAuthHeaders()
    )
    return res.data
}