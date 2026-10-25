import { useMutation } from "@tanstack/react-query"
import type { UserLoginInput, UserLoginOutput, UserRegisterInput } from "../types/authLogin"
import type { AxiosError } from "axios"
import { authLogin } from "../api/authService"
import { authRegister } from "../api/authService"


export const useLogin=()=>{
    return useMutation<UserLoginOutput,AxiosError,UserLoginInput>({
      mutationFn:authLogin
    })
}
export const useRegister=()=>{
    return useMutation<UserLoginOutput,AxiosError,UserRegisterInput>({
      mutationFn:authRegister
    })
}

