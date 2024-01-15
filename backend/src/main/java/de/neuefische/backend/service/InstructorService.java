package de.neuefische.backend.service;

import de.neuefische.backend.dto.InstructorDto;
import de.neuefische.backend.exceptions.InstructorNotFoundException;
import de.neuefische.backend.model.Instructor;
import de.neuefische.backend.model.Qualification;
import de.neuefische.backend.repository.InstructorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InstructorService {
    private final InstructorRepository instructorRepository;
    @Autowired
    public InstructorService(InstructorRepository instructorRepository){
        this.instructorRepository=instructorRepository;
    }

    public Optional<Instructor> getInstructorById(String id){
        return instructorRepository.findById(id);
    }

    public List<Instructor> findAllInstructors() {
        return instructorRepository.findAll();
    }

    public Instructor saveInstructor(InstructorDto instructorDto) {
        Qualification qualification=instructorDto.getQualification();
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

    public Instructor updateInstructor(String id, InstructorDto instructorDto) throws InstructorNotFoundException {
        return instructorRepository.findById(id)
                .map( instructorToUpdate ->{
                    instructorToUpdate.setFirstName(instructorDto.getFirstName());
                    instructorToUpdate.setLastName(instructorDto.getLastName());
                    instructorToUpdate.setPhoneNumber(instructorDto.getPhoneNumber());
                    instructorToUpdate.setEmail(instructorDto.getEmail());
                    instructorToUpdate.setQualification(instructorDto.getQualification());
                    return instructorRepository.save(instructorToUpdate);
                })
                .orElseThrow(()-> new InstructorNotFoundException("Could not find instructor with the id: " + id));
    }

    public void deleteInstructor(String id)  {
        instructorRepository.deleteById(id);
    }
}
