export class UserLoginDto
{
    AuthFlow = 'USER_PASSWORD_AUTH';
    ClientId:string='asd';
    AuthParameters:any;

    constructor(clientId:string,username:string,password:string)
    {
        this.ClientId = clientId;
        this.AuthParameters = {'USERNAME': username,'PASSWORD': password};
    }
}