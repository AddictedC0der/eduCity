import { IUser, IStats } from '../user.model';


export interface AuthResponse {
    user: IUser & {UserStats: IStats},
    tokens: {
        accessToken: string,
        refreshToken: string
    }
}