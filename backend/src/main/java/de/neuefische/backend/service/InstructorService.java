package de.neuefische.backend.service;

import de.neuefische.backend.model.Instructor;
import de.neuefische.backend.repository.InstructorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstructorService {
    private final InstructorRepository instructorRepository;
    @Autowired
    public InstructorService(InstructorRepository instructorRepository){
        this.instructorRepository=instructorRepository;
    }
    public List <Instructor> getInstructors(){
        return instructorRepository.findAll();
    }
}
