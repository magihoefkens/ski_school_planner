package de.neuefische.backend.controller;

import de.neuefische.backend.dto.InstructorDto;
import de.neuefische.backend.exceptions.InstructorNotFoundException;
import de.neuefische.backend.model.Instructor;
import de.neuefische.backend.service.InstructorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/instructors")
@RequiredArgsConstructor
public class InstructorController {
    private final InstructorService instructorService;
    @GetMapping
    public List<Instructor> getAllInstructors(){
        return instructorService.findAllInstructors();
    }
    @GetMapping("/{id}")
    public Instructor getInstructorById(@PathVariable String id) throws InstructorNotFoundException{
        return instructorService.getInstructorById(id)
                .orElseThrow( () -> new InstructorNotFoundException("Instructor with the id: " + id+ " not found"));
    }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Instructor createInstructor(@RequestBody InstructorDto instructorDto){
        return instructorService.saveInstructor(instructorDto);
    }
    @PutMapping("/{id}")
    public Instructor updateInstructor(@PathVariable String id, @RequestBody InstructorDto instructorDto) throws InstructorNotFoundException{
        return instructorService.updateInstructor(id,instructorDto);
    }
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteInstructor(@PathVariable String id){
        instructorService.deleteInstructor(id);
    }
}
