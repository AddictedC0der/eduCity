export interface IUser {
    id: number,
    UserLogin: string,
    UserEmail: string,
    UserPassword: string,
    UserRole: string
}

export interface IUserDto {
    UserLogin: string,
    UserEmail: string,
    UserPassword: string,
    UserRole: string
}

export interface IUserLogin {
    UserLogin: string,
    UserPassword: string
}