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


export interface IStats {
    CompletedWorks: number;
    LostWorks: number;
    MasterUser: any;
}

export interface IUserState {
    user: IUser;
    stats: IStats;
}