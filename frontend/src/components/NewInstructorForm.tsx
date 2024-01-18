import {InstructorDto} from "../models/InstructorDto.ts";
import {ChangeEvent, FormEvent, useState} from "react";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
    TextField
} from "@mui/material";
import Swal from "sweetalert2";
import {Qualification} from "../models/Qualification.ts";

type AddInstructorProps={
    addInstructor:(instructor:InstructorDto) =>void;
    closeDialog:() =>void;
}
export default function NewInstructorForm(props:AddInstructorProps){
     const addInstructor = props.addInstructor;

     const[qualification,setQualification]=useState<Qualification>({
         isSkiInstructor: false,
         isSnowboardInstructor: false,
         isNordicSkiInstructor: false,
         isSegwayInstructor: false,
         isHikingGuide: false
     });
    const[instructor,setInstructor]=useState<InstructorDto>({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        qualification
    });
    function handleChangeName(event: ChangeEvent<HTMLInputElement>) {
        setInstructor({...instructor, [event.target.name]: event.target.value})
    }
    function handleSubmitNewInstructor(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        props.closeDialog();
        Swal.fire({
            title: 'Hinzufügen...',
            text: 'Bitte warten...',
            didOpen() {
                Swal.showLoading()
                addInstructor(instructor);
            }
        }).then();
        setInstructor({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            qualification: { ...qualification
            }});
    }

    function handleChangeCheckbox(event:ChangeEvent<HTMLInputElement>) {
        const {name,checked}=event.target;
        setQualification(
            (prevQualification) => ({
                ...prevQualification,
                [name]:checked,
            })
        );
        setInstructor(
            (prevInstructor) => ({
                ...prevInstructor,
                qualification: {
                    ...prevInstructor.qualification,
                    [name]:checked,
                },
            })
        );
        console.log(instructor)
    }

    return(
         <Box sx={{minWidth: 120, mt: 2}} component={"form"} onSubmit={handleSubmitNewInstructor}>
             <FormControl fullWidth sx={{gap: 2}}>

                 <TextField value={instructor.firstName}
                            name="firstName"
                            onChange={handleChangeName}
                            label="Vorname"
                            variant="outlined"/>
                 <TextField value={instructor.lastName}
                            name="lastName"
                            onChange={handleChangeName}
                            label="Nachname"
                            variant="outlined"/>
                 <TextField value={instructor.phoneNumber}
                            name="phoneNumber"
                            onChange={handleChangeName}
                            label="Telefon"
                            variant="outlined"/>
                 <TextField value={instructor.email}
                            name="email"
                            onChange={handleChangeName}
                            label="Email"
                            variant="outlined"/>
                 <FormLabel component="legend">Qualifikationen zuweisen</FormLabel>
                 <FormGroup>
                     <FormControlLabel
                         control={
                             <Checkbox checked={qualification.isSkiInstructor} onChange={handleChangeCheckbox} name="isSkiInstructor" />
                         }
                         label="Skilehrer"
                     />
                     <FormControlLabel
                         control={
                             <Checkbox checked={qualification.isSnowboardInstructor} onChange={handleChangeCheckbox} name="isSnowboardInstructor" />
                         }
                         label="Snowboardlehrer"
                     />
                     <FormControlLabel
                         control={
                             <Checkbox checked={qualification.isNordicSkiInstructor} onChange={handleChangeCheckbox} name="isNordicSkiInstructor" />
                         }
                         label="Nordic SkiLehrer"
                     />
                     <FormControlLabel
                         control={
                             <Checkbox checked={qualification.isSegwayInstructor} onChange={handleChangeCheckbox} name="isSegwayInstructor" />
                         }
                         label="Segwaylehrer"
                     />
                     <FormControlLabel
                         control={
                             <Checkbox checked={qualification.isHikingGuide} onChange={handleChangeCheckbox} name="isHikingGuide" />
                         }
                         label="Wanderführer"
                     />
                 </FormGroup>
                 <FormHelperText>Wählen Sie die Qualifikationen des Lehrer aus</FormHelperText>


                 <Button type={"submit"}>Hinzufügen</Button>
             </FormControl>
         </Box>
     );
     }
