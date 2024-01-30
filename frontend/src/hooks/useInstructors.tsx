import {useCallback, useEffect, useState} from "react";
import {Instructor} from "../models/Instructor.ts";
import Swal from "sweetalert2";
import axios from "axios";
import ErrorHandling from "../components/errorHandling/ErrorHandling.tsx";
import {InstructorDto} from "../models/InstructorDto.ts";
import {toast} from "react-toastify";


export default function useInstructors(){
    const [instructors,setInstructors]=useState<Instructor[]>([])
    const[loading,setLoading]=useState<boolean>(false);
    const BASE_URL_INSTRUCTORS:string='api/instructors';
    const fetchInstructors = useCallback(() => {
        setLoading(true);
        Swal.fire({
            title: 'Skilehrer werden geladen...',
            didOpen: () => {
                Swal.showLoading()
                axios.get(BASE_URL_INSTRUCTORS)
                    .then(r => {
                        setInstructors(r.data);
                        Swal.close();
                    })
                    .catch(() => <ErrorHandling message={"Fehler beim Laden der Skilehrer"}/>)
                    .finally(() => setLoading(false));
            }
        }).then();
    }, []);

    useEffect(() => {
        fetchInstructors();
    }, [fetchInstructors]);


        function addInstructor(instructor:InstructorDto) {
        setLoading(true);
        Swal.fire({
            title: 'Skilehrer wird hinzugefügt...',
            didOpen: () => {
                Swal.showLoading();
                    axios.post(BASE_URL_INSTRUCTORS, instructor)
                        .then((r) => {
                            Swal.close();
                            fetchInstructors();
                            toast.success("Skilehrer " + r.data.firstName + " " + r.data.lastName + " erfolgreich hinzugefügt");
                        })
                        .catch(() => <ErrorHandling message={"Fehler beim Hinzufügen des Dozenten"}/>)
                        .finally(() => setLoading(false));
                }
            }
        ).then();
    }

    function updateInstructor(id: string, instructor: InstructorDto) {
        setLoading(true);
        Swal.fire({
            title: 'Skilehrer wird aktualisiert...',
            didOpen: () => {
                Swal.showLoading();

                    axios.put(BASE_URL_INSTRUCTORS + '/' + id, instructor)
                        .then(() => {
                            Swal.close();
                            fetchInstructors();
                            toast.success("Skilehrer wurde aktualisiert");
                        })
                        .catch(() => <ErrorHandling message={"Fehler beim Aktualisieren des Skilehrer"}/>)
                        .finally(() => setLoading(false));

            }
        }).then();
    }

    function deleteInstructor(id: string) {
        setLoading(true);
        Swal.fire({
            title: 'Skilehrer wird gelöscht...',
            didOpen: () => {
                Swal.showLoading();

                    axios.delete(BASE_URL_INSTRUCTORS + '/' + id)
                        .then(() => {
                            Swal.close();
                            fetchInstructors();
                            toast.success("Dozent erfolgreich gelöscht");
                        })
                        .catch(() => <ErrorHandling message={"Fehler beim Löschen des Skilehrers"}/>)
                        .finally(() => setLoading(false));
                }

        }).then();
    }

    return {instructors, loading, addInstructor, updateInstructor, deleteInstructor};

}