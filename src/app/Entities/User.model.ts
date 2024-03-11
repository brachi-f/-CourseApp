

export class User {
    id!: number;
    name?: string;
    address?: string;
    email?: string;
    password?: string;
    role?: Role;
}
export enum Role {
    "student" = 0,
    "lecturer" = 1
}