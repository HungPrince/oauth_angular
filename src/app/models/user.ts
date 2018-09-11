export class User {
    UserName: string;
    Password: string;
    ConfirmPassword: string;

    constructor(userName: string, passWord: string, confirmPassWord: string) {
        this.UserName = userName;
        this.Password = passWord;
        this.ConfirmPassword = confirmPassWord;
    }
}
