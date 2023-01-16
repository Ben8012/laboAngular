import { Adress } from "./adress.model";

export interface IRegister {
  firstname: string;
  lastname: string;
  email: string;
  birthdate: string;
  phone : string;
  password : string;
  adresse : Adress[];

};
