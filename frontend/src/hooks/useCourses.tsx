import {useCallback, useEffect, useState} from "react";
import Swal from "sweetalert2";
import axios from "axios";
import ErrorHandling from "../components/errorHandling/ErrorHandling.tsx";
import {Course} from "../models/Course.ts";
import {CourseDto} from "../models/CourseDto.ts";
import {toast} from "react-toastify";

export default function useCourses(){
    const [courses, setCourses] = useState<Course[]>([]);
    const [loadingCourses, setLoadingCourses] = useState<boolean>(false);

    const BASE_URL_COURSES: string = '/api/courses';
    const fetchCourses = useCallback(() => {
        setLoadingCourses(true);
        Swal.fire({
            title: 'Kurse werden geladen...',
            didOpen: () => {
                Swal.showLoading()
                axios.get(BASE_URL_COURSES)
                    .then(r => {
                        setCourses(r.data);
                        Swal.close();
                    })
                    .catch(() => <ErrorHandling message={"Fehler beim Laden der Kurse"}/>)
                    .finally(() => setLoadingCourses(false));
            }
        }).then();
    }, []);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    function addCourse(course: CourseDto) {
        setLoadingCourses(true);
        Swal.fire({
            title: 'Kurs wird hinzugefügt...',
            didOpen: () => {
                Swal.showLoading();
                axios.post(BASE_URL_COURSES, course.instructorId ? course : {
                        courseType: course.courseType,
                        courseLevel:course.courseLevel,
                        participants: course.participants,
                        completed:course.completed

                    })
                        .then(() => {
                            Swal.close();
                            fetchCourses();
                            toast.success("Kurs erfolgreich hinzugefügt");
                        })
                        .catch(() => <ErrorHandling message={"Fehler beim Hinzufügen des Kurses"}/>)
                        .finally(() => setLoadingCourses(false));
                }

        }).then()
    }

     function updateCourse(id: string, course: CourseDto) {
        setLoadingCourses(true);
        Swal.fire({
            title: 'Kurs wird aktualisiert...',
            didOpen: () => {
                Swal.showLoading();
                console.log(course);
                axios.put(BASE_URL_COURSES + '/' + id, course, {

                    })
                        .then(() => {
                            Swal.close();
                            fetchCourses();
                            toast.success("Kurs erfolgreich aktualisiert");
                        })
                        .catch(() => <ErrorHandling message={"Fehler beim Aktualisieren des Kurses"}/>)
                        .finally(() => setLoadingCourses(false));
            }
        }).then()
    }

    function deleteCourse(id: string) {
        setLoadingCourses(true);
        Swal.fire({
            title: 'Kurs wird gelöscht...',
            didOpen: () => {
                Swal.showLoading();

                    axios.delete(BASE_URL_COURSES + '/' + id, {

                    })
                        .then(() => {
                            Swal.close();
                            fetchCourses();
                            toast.success("Kurs erfolgreich gelöscht");
                        })
                        .catch(() => <ErrorHandling message={"Fehler beim Löschen des Kurses"}/>)
                        .finally(() => setLoadingCourses(false));

            }
        }).then();
    }

    return {courses, loading: loadingCourses, addCourse, deleteCourse, updateCourse};
}

