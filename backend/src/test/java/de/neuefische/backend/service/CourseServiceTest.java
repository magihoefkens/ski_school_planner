package de.neuefische.backend.service;

import de.neuefische.backend.dto.CourseDto;
import de.neuefische.backend.exceptions.CourseNotFoundException;
import de.neuefische.backend.model.Course;
import de.neuefische.backend.model.Participant;
import de.neuefische.backend.model.CourseLevel;
import de.neuefische.backend.model.CourseType;
import de.neuefische.backend.repository.CourseRepository;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CourseServiceTest {
    private final CourseRepository courseRepository=mock(CourseRepository.class);
    private final CourseService courseService=new CourseService(courseRepository);
    @Test
    void getCourseById() {
        //GIVEN
        when(courseRepository.findById("123")).thenReturn(Optional.of(new Course()));
        //WHEN
        Optional<Course> course= courseService.getCourseById("123");
        //THEN
        assertTrue(course.isPresent());
    }

    @Test
    void findAllCourses_whenNoCoursesInDatabase() {
        //GIVEN
        List<Course> courses=List.of();
        when(courseRepository.findAll()).thenReturn(courses);
        //WHEN
        List<Course> actual=courseService.findAllCourses();
        //THEN
        List<Course> expected=List.of();
        verify(courseRepository).findAll();
        assertEquals(expected,actual);

    }
    @Test
    void findAllCourses_whenCoursesInDatabase(){
        //GIVEN
            Participant participant1=new Participant("joe","doe","123456");
            Participant participant2=new Participant("tut","was","45678");
            List<Participant>participants=List.of(participant1,participant2);
            Course kurs1=new Course("123",CourseType.SKI,CourseLevel.BEGINNER,"12",participants,false);
            Course kurs2=new Course("124",CourseType.SNOWBOARD,CourseLevel.BEGINNER,"12",participants,false);
            List<Course>expected=List.of(kurs1,kurs2);
            when(courseRepository.findAll()).thenReturn(expected);
        //WHEN
            List<Course> actual=courseService.findAllCourses();
        //THEN
            //verify(courseRepository.findAll());
            assertEquals(expected,actual);
    }

    @Test
    void saveCourse() {
        //GIVEN
        Participant participant1=new Participant("joe","doe","123456");
        Participant participant2=new Participant("tut","was","45678");
        List<Participant>participants=List.of(participant1,participant2);
        CourseDto kurs1=new CourseDto(CourseType.SKI,CourseLevel.BEGINNER,"12",participants,false);
        when(courseRepository.save(any(Course.class))).thenReturn(new Course());
        //WHEN
            Course savedCourse=courseService.saveCourse(kurs1);

        //THEN
        assertNotNull(savedCourse);
    }

    @Test
    void updateCourse() throws CourseNotFoundException {
        //GIVEN
        Participant participant1=new Participant("joe","doe","123456");
        Participant participant2=new Participant("tut","nix","45678");
        List<Participant>participants=List.of(participant1,participant2);
        CourseDto kurs1=new CourseDto(CourseType.SKI,CourseLevel.BEGINNER,"12",participants,false);
        when(courseRepository.findById("123")).thenReturn(Optional.of(new Course()));
        when(courseRepository.save(any(Course.class))).thenReturn(new Course());
        //WHEN
        Course updatedCourse= courseService.updateCourse("123", kurs1);
        //THEN
        assertNotNull(updatedCourse);
    }

    @Test
    void deleteCourse() throws CourseNotFoundException{
        courseService.deleteCourse("123");
        verify(courseRepository,times(1)).deleteById("123");
    }
}