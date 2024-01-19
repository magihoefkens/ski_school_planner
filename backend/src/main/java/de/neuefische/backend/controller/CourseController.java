package de.neuefische.backend.controller;

import de.neuefische.backend.dto.CourseDto;
import de.neuefische.backend.exceptions.CourseNotFoundException;
import de.neuefische.backend.model.Course;
import de.neuefische.backend.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/courses")
@RequiredArgsConstructor
public class CourseController {
    private final CourseService courseService;
    @GetMapping
    public List<Course> getAllCourses(){
        return courseService.findAllCourses();
    }
    @GetMapping("/{id}")
    public Course getCourseById(@PathVariable String id) throws CourseNotFoundException{
        return courseService.getCourseById(id)
                .orElseThrow(() ->new CourseNotFoundException("Course with the id: "+ id+" not found"));
    }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Course createCourse(@RequestBody CourseDto courseDto){
        return courseService.saveCourse(courseDto);
    }
    @PutMapping("/{id}")
    public Course updateCourse(@PathVariable String id,@RequestBody CourseDto courseDto) throws CourseNotFoundException{
        return courseService.updateCourse(id,courseDto);
    }
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCourse(@PathVariable String id){
        courseService.deleteCourse(id);
    }
}
