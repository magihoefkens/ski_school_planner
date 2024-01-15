package de.neuefische.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.dto.InstructorDto;
import de.neuefische.backend.exceptions.InstructorNotFoundException;
import de.neuefische.backend.model.Instructor;
import de.neuefische.backend.model.Qualification;
import de.neuefische.backend.repository.InstructorRepository;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class InstructorServiceTest {


    private final InstructorRepository instructorRepository = mock(InstructorRepository.class);
    private final InstructorService instructorService= new InstructorService(instructorRepository);
    @Test
    void getAllInstructors_whenNoInstructorInDatabase_expectEmptyList(){
        //GIVEN
        List<Instructor> instructors=List.of();
        when(instructorRepository.findAll()).thenReturn(instructors);
        //WHEN
        List<Instructor> actual=instructorService.findAllInstructors();
        //THEN
        List<Instructor> expected=List.of();
        verify(instructorRepository).findAll();
        assertEquals(expected,actual);
    }
    @Test
    void getAllInstructors_whenDatabaseNotEmpty_expectListOfInstructors()throws Exception{
        //GIVEN
        List<Instructor> expected=List.of(new Instructor("1", "John", "Doe", "john.doe@example.com", "123456", new Qualification()));
        when(instructorRepository.findAll()).thenReturn(expected);
        //WHEN
        List<Instructor> actual=instructorService.findAllInstructors();
        //THEN
        verify(instructorRepository).findAll();
        assertEquals(expected,actual);
    }
    @Test
    void getInstructorById() throws InstructorNotFoundException {
        // GIVEN
        when(instructorRepository.findById("1")).thenReturn(Optional.of(new Instructor()));

        // WHEN
        Optional<Instructor> instructor = instructorService.getInstructorById("1");

        // THEN
        assertTrue(instructor.isPresent());
    }

    @Test
    void saveInstructor() {
        // GIVEN
        Qualification qualification=new Qualification();
        InstructorDto instructorDto = new InstructorDto();
        instructorDto.setQualification(qualification);
        when(instructorRepository.save(any(Instructor.class))).thenReturn(new Instructor());

        // WHEN
        Instructor savedInstructor = instructorService.saveInstructor(instructorDto);

        // THEN
        assertNotNull(savedInstructor);
    }

    @Test
    void updateInstructor() throws InstructorNotFoundException{
        // GIVEN
        InstructorDto instructorDto = new InstructorDto();
        when(instructorRepository.findById("1")).thenReturn(Optional.of(new Instructor()));
        when(instructorRepository.save(any(Instructor.class))).thenReturn(new Instructor());

        // WHEN
        Instructor updatedInstructor = instructorService.updateInstructor("1", instructorDto);

        // THEN
        assertNotNull(updatedInstructor);
    }

    @Test
    void deleteInstructor() throws InstructorNotFoundException{
        // WHEN
        instructorService.deleteInstructor("1");

        // THEN
        verify(instructorRepository, times(1)).deleteById("1");
    }


}