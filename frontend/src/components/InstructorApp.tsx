
import {Instructor} from "../models/Instructor.ts";
import {useEffect, useState} from "react";
import axios from "axios";


export default function InstructorApp(){
    const [instructors, setInstructors]=useState<Instructor[]>([])
    const fetchData=() =>
        axios.get("/api/instructors")
            .then(response =>{
                    setInstructors(response.data)
                    console.log(instructors)
                }
            )
            .catch(error =>
                console.log(error.message)
            )
    useEffect(() => {
            fetchData()
        },[]
    )

    return(
        <>
            <h1>Instructor List</h1>
            <ul>
            {instructors.map((instructor) => (
                <li key={instructor.id}>{instructor.firstName},{instructor.lastName},{instructor.email},{instructor.phoneNumber}</li>

                ))}
            </ul>
        </>
    )
}