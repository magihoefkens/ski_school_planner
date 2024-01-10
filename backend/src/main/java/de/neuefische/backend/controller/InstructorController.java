package de.neuefische.backend.controller;

import de.neuefische.backend.dto.InstructorDto;
import de.neuefische.backend.dto.QualificationDto;
import de.neuefische.backend.model.Instructor;
import de.neuefische.backend.model.Qualification;
import de.neuefische.backend.repository.InstructorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/instructors")
@RequiredArgsConstructor
public class InstructorController {
    private final InstructorRepository instructorRepository;
    @GetMapping
    public List<Instructor> getAllInstructors(){
        return instructorRepository.findAll();
    }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Instructor createInstructor(@RequestBody InstructorDto instructorDto){
        QualificationDto qualification=instructorDto.getQualification();
        return instructorRepository.save(
                Instructor.builder()
                        .firstName(instructorDto.getFirstName())
                        .lastName(instructorDto.getLastName())
                        .email(instructorDto.getEmail())
                        .phoneNumber(instructorDto.getPhoneNumber())
                        .qualification(Qualification.builder()
                                .isNordicSkiInstructor(qualification.isSkiInstructor())
                                .isSnowboardInstructor(qualification.isSnowboardInstructor())
                                .isNordicSkiInstructor(qualification.isNordicSkiInstructor())
                                .isSegwayInstructor(qualification.isSegwayInstructor())
                                .isHikingGuide(qualification.isHikingGuide())
                                .build()
                        )
                .build()
        );
    }
}
