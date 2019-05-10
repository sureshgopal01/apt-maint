export class User {
    id: number;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;

    /*constructor(username: string,password: string,firstName: string,lastName: string, role: string) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
    }*/

    public static isNull(user: User): boolean {
        return user.userName === null &&
            user.password === null; /*&&
            user.firstname === null &&
            user.lastname === null;*/
}

}
