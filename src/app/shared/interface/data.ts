
export interface NewPassword extends email{

    newPassword:string;
}


export interface Address{
    details:string,
    phone:string;
    city:string;
}
export interface code
{
    resetCode:string;
}

export interface email{
    email:string;
}

export interface registerData extends loginData ,email
{

    name:string;
  
    rePassword:string;
    phone:string
}



export interface loginData extends email
{
    password:string;
}