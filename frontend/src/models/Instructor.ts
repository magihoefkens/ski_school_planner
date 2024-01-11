import {Qualification} from "./Qualification.ts";

export type Instructor={
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    qualification: Qualification,
}