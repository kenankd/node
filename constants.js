export const SALT_ROUNDS=10;
export const SECRET = "tajna"

export const ROLES = {
    USER: 'user',
    ADMIN: 'admin'
}
export const PERMISSIONS = {
    user: [],
    admin: ['GET /']
}