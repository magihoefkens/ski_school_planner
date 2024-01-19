package de.neuefische.backend.service;

import de.neuefische.backend.dto.CourseDto;
import de.neuefische.backend.exceptions.CourseNotFoundException;
import de.neuefische.backend.model.Course;
import de.neuefische.backend.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {
    private final CourseRepository courseRepository;
    @Autowired
    public CourseService(CourseRepository courseRepository){
        this.courseRepository=courseRepository;
    }
    public Optional<Course> getCourseById(String id){
        return courseRepository.findById(id);
    }
    public List<Course> findAllCourses(){
        return courseRepository.findAll();
    }
    public Course saveCourse(CourseDto courseDto){
        return courseRepository.save(Course.builder()
                .courseType(courseDto.getCourseType())
                .courseLevel(courseDto.getCourseLevel())
                .instructorId(courseDto.getInstructorId())
                .participants(courseDto.getParticipants())
                .completed(courseDto.isCompleted())
                .build());
    }
    public Course updateCourse(String id, CourseDto courseDto) throws CourseNotFoundException {
        return courseRepository.findById(id)
                .map( courseToUpdate ->{
                    courseToUpdate.setCourseType(courseDto.getCourseType());
                    courseToUpdate.setCourseLevel(courseDto.getCourseLevel());
                    courseToUpdate.setInstructorId(courseDto.getInstructorId());
                    courseToUpdate.setParticipants(courseDto.getParticipants());
                    courseToUpdate.setCompleted(courseDto.isCompleted());
                    return courseRepository.save(courseToUpdate);
                })
                .orElseThrow(() -> new CourseNotFoundException("Could not find course with the id: "+ id));
    }
    public void deleteCourse(String id){
        courseRepository.deleteById(id);
    }
}
