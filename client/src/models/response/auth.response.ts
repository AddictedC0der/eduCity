export interface AuthResponse {
    user: any,
    tokens: {
        accessToken: string,
        refreshToken: string
    }
}