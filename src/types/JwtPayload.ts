import RoleType from "./RoleType.js";

export default interface JwtPayload {
    userId: string,
    userRole: RoleType
}