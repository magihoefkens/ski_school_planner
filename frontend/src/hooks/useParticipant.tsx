import {useEffect, useState} from "react";
import {Participant} from "../models/Participant.ts";
import {Course} from "../models/Course.ts";

export default function useParticipant(courseToUpdate: Course|undefined){
    const[participants,setParticipants]=useState<Participant[]>([]);
    const[loadingParticipant,setLoadingParticipant]=useState<boolean>(false);
    useEffect(() => {
        if(courseToUpdate) {

            setLoadingParticipant(true)
            setParticipants(courseToUpdate?.participants)
        }

    }, [courseToUpdate]);
    const addParticipant = (newParticipant:Participant) => {
        setLoadingParticipant(true);
        console.log("new Participant:" +newParticipant);
        courseToUpdate?.participants?.push(newParticipant);

        setParticipants((prevParticipants) => [...prevParticipants, newParticipant]);
        console.log(courseToUpdate?.participants)
    };
    useEffect(() => {
        setLoadingParticipant(true)
    }, [courseToUpdate?.participants,loadingParticipant]);

    const deleteParticipant = (participant: Participant) => {
        setLoadingParticipant(true);
        setParticipants((prevParticipants) =>
            prevParticipants?.filter(
                (p) =>
                    p.firstName !== participant.firstName ||
                    p.lastName !== participant.lastName ||
                    p.phoneNumber !== participant.phoneNumber
            )
        );
    };

    const updateParticipant = (
        originalParticipant: Participant,
        updatedParticipant: Participant
    ) => {
        setLoadingParticipant(true);
        setParticipants((prevParticipants) =>
            prevParticipants?.map((p) =>
                p === originalParticipant ? updatedParticipant : p
            )
        );
    };

    return { participants,loading:loadingParticipant,addParticipant, deleteParticipant, updateParticipant };
}