import { v4 as uuid} from "uuid"

type SingInRequestData = {
    email:string,
    password:string
}

const delay = (amount = 750) => new Promise(resolver => setTimeout(resolver, amount))

export async function singInRequest(data: SingInRequestData) {
    await delay()

    return {
        token:uuid(),
        user:{
            name:'deivd',
            email:'joaopedro105manairapb@gmail.com',
            avatar_url:'https://github.com/joaopedro23.png'
        }
    }
}

export async function recoveUserInformation() {
    await delay();

     return {
        user:{
            name:'deivd',
            email:'joaopedro105manairapb@gmail.com',
            avatar_url:'https://github.com/joaopedro23.png'
        }
    };
}