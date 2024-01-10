package de.neuefische.backend.service;

import de.neuefische.backend.model.Instructor;
import de.neuefische.backend.repository.InstructorRepository;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class InstructorServiceTest {
    private final InstructorRepository instructorRepository = mock(InstructorRepository.class);
    private final InstructorService instructorService= new InstructorService(instructorRepository);
    @Test
    void getInstructors_whenNoInstructorInDatabase_expectEmptyList(){
        //GIVEN
        List<Instructor> instructors=List.of();
        when(instructorRepository.findAll()).thenReturn(instructors);
        //WHEN
        List<Instructor> actual=instructorService.getInstructors();
        //THEN
        List<Instructor> expected=List.of();
        verify(instructorRepository).findAll();
        assertEquals(expected,actual);
    }

}