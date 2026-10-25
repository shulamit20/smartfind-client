export interface UserLoginInput {
    password: string,
    email: string
}

export interface User {
    id: number,
    fullName: string,
    email: string,
    role: string,
    createdAt: string
}


export interface UserLoginOutput {
    token: string,
    user: User
} 

export interface UserRegisterInput{
    fullName:string,
     email: string,
     password: string

}