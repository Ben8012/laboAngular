import { Adress } from "./adress.model";

export interface User {
    firstname: string;
    lastname: string;
    email: string;
    birthdate: string;
    password : string;
    addresses: Adress[];
};
