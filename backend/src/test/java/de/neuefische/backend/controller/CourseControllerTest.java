package de.neuefische.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.dto.CourseDto;
import de.neuefische.backend.dto.InstructorDto;
import de.neuefische.backend.model.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class CourseControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    private static final String COURSE_URL="/api/courses";

    @Test
    void getAllCourses_shouldReturnEmptyList_whenCalledInitially() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get(COURSE_URL))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("[]"));
    }
    @Test
    void getAllCourses_shouldReturnListOfCourses() throws Exception{
        InstructorDto instructorsToAdd=new InstructorDto("John", "Doe", "john.doe@example.com", "123456", new Qualification());
        String instructorToAddAsJson=objectMapper.writeValueAsString(instructorsToAdd);
        MvcResult resultInstructor=mockMvc.perform(MockMvcRequestBuilders.post("/api/instructors")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(instructorToAddAsJson))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andReturn();
        String bodyInstructor=resultInstructor.getResponse().getContentAsString();
        Instructor createdInstructor= objectMapper.readValue(bodyInstructor, Instructor.class);
        Participant participant1=new Participant("joe","doe","123456");
        Participant participant2=new Participant("tut","nix","45678");
        List<Participant> participants=List.of(participant1,participant2);
        CourseDto courseToAdd=new CourseDto(CourseType.SKI, CourseLevel.BEGINNER,createdInstructor.getId(),participants,false);
        String courseToAddAsJson=objectMapper.writeValueAsString(courseToAdd);
        MvcResult result=mockMvc.perform(MockMvcRequestBuilders.post(COURSE_URL)
                .contentType(MediaType.APPLICATION_JSON)
                .content(courseToAddAsJson))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andReturn();
        String body=result.getResponse().getContentAsString();
        Course savedCourse=objectMapper.readValue(body,Course.class);
        String courseAsJson=objectMapper.writeValueAsString(savedCourse);
        //WHEN+THEN
        mockMvc.perform(MockMvcRequestBuilders.get(COURSE_URL + "/"+ savedCourse.getId()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(courseAsJson));
    }

    @Test
    void getCourseById() throws Exception{
        //GIVEN
        Participant participant1=new Participant("joe","doe","123456");
        Participant participant2=new Participant("tut","nix","45678");
        List<Participant> participants=List.of(participant1,participant2);
        CourseDto courseToAdd=new CourseDto(CourseType.SKI, CourseLevel.BEGINNER,null,participants,false);
        String courseToAddAsJson=objectMapper.writeValueAsString(courseToAdd);
        MvcResult mvcResult=mockMvc.perform(MockMvcRequestBuilders.post(COURSE_URL)
                .contentType(MediaType.APPLICATION_JSON)
                .content(courseToAddAsJson))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andReturn();
        Course savedCourse=objectMapper.readValue(mvcResult.getResponse().getContentAsString(),Course.class);
        String savedCourseAsJson=objectMapper.writeValueAsString(savedCourse);
        //WHEN+THEN
        mockMvc.perform(MockMvcRequestBuilders.get(COURSE_URL+"/"+savedCourse.getId()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(savedCourseAsJson));


    }

    @Test
    void createCourse() throws Exception{
        InstructorDto instructorsToAdd=new InstructorDto("John", "Doe", "john.doe@example.com", "123456", new Qualification());
        String instructorToAddAsJson=objectMapper.writeValueAsString(instructorsToAdd);
        MvcResult resultInstructor=mockMvc.perform(MockMvcRequestBuilders.post("/api/instructors")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(instructorToAddAsJson))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andReturn();
        String bodyInstructor=resultInstructor.getResponse().getContentAsString();
        Instructor createdInstructor= objectMapper.readValue(bodyInstructor, Instructor.class);
        Participant participant1=new Participant("joe","doe","123456");
        Participant participant2=new Participant("tut","nix","45678");
        List<Participant> participants=List.of(participant1,participant2);
        CourseDto courseToAdd=new CourseDto(CourseType.SKI, CourseLevel.BEGINNER,createdInstructor.getId(),participants,false);
        String courseToAddAsJson=objectMapper.writeValueAsString(courseToAdd);
        MvcResult result=mockMvc.perform(MockMvcRequestBuilders.post(COURSE_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(courseToAddAsJson))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andReturn();
        String body=result.getResponse().getContentAsString();
        Course savedCourse=objectMapper.readValue(body,Course.class);
        assertEquals(courseToAdd.getCourseType(),savedCourse.getCourseType());
        assertEquals(courseToAdd.getCourseLevel(),savedCourse.getCourseLevel());
        assertNotNull(savedCourse.getId());
    }

    @Test
    void updateCourse() throws Exception{
        InstructorDto instructorsToAdd=new InstructorDto("John", "Doe", "john.doe@example.com", "123456", new Qualification());
        String instructorToAddAsJson=objectMapper.writeValueAsString(instructorsToAdd);
        MvcResult resultInstructor=mockMvc.perform(MockMvcRequestBuilders.post("/api/instructors")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(instructorToAddAsJson))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andReturn();
        String bodyInstructor=resultInstructor.getResponse().getContentAsString();
        Instructor createdInstructor= objectMapper.readValue(bodyInstructor, Instructor.class);
        Participant participant1=new Participant("joe","doe","123456");
        Participant participant2=new Participant("tut","nix","45678");
        List<Participant> participants=List.of(participant1,participant2);
        CourseDto courseToAdd=new CourseDto(CourseType.SKI, CourseLevel.BEGINNER,createdInstructor.getId(),participants,false);
        String courseToAddAsJson=objectMapper.writeValueAsString(courseToAdd);
        MvcResult coursePostResult=mockMvc.perform(MockMvcRequestBuilders.post(COURSE_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(courseToAddAsJson))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andReturn();
        String coursePostResultBody= coursePostResult.getResponse().getContentAsString();
        Course createdCourse=objectMapper.readValue(coursePostResultBody,Course.class);
        CourseDto updateCourseDto=new CourseDto(CourseType.SNOWBOARD,CourseLevel.INTERMEDIATE,createdInstructor.getId(),participants,true);
        String updatedCourseDtoAsJson=objectMapper.writeValueAsString(updateCourseDto);
        MvcResult coursePutResult=mockMvc.perform(MockMvcRequestBuilders.put(COURSE_URL+"/"+createdCourse.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(updatedCourseDtoAsJson))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
        String coursePutResultAsString=coursePutResult.getResponse().getContentAsString();
        Course updatedCourse=objectMapper.readValue(coursePutResultAsString,Course.class);
        assertEquals(updateCourseDto.getCourseLevel(),updatedCourse.getCourseLevel());
        assertEquals(updateCourseDto.getCourseType(),updatedCourse.getCourseType());
    }

    @Test
    void deleteCourse() throws Exception{
        InstructorDto instructorsToAdd=new InstructorDto("John", "Doe", "john.doe@example.com", "123456", new Qualification());
        String instructorToAddAsJson=objectMapper.writeValueAsString(instructorsToAdd);
        MvcResult resultInstructor=mockMvc.perform(MockMvcRequestBuilders.post("/api/instructors")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(instructorToAddAsJson))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andReturn();
        String bodyInstructor=resultInstructor.getResponse().getContentAsString();
        Instructor createdInstructor= objectMapper.readValue(bodyInstructor, Instructor.class);
        Participant participant1=new Participant("joe","doe","123456");
        Participant participant2=new Participant("tut","nix","45678");
        List<Participant> participants=List.of(participant1,participant2);
        CourseDto courseToAdd=new CourseDto(CourseType.SKI, CourseLevel.BEGINNER,createdInstructor.getId(),participants,false);
        String courseToAddAsJson=objectMapper.writeValueAsString(courseToAdd);
        MvcResult result=mockMvc.perform(MockMvcRequestBuilders.post(COURSE_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(courseToAddAsJson))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andReturn();
        String body=result.getResponse().getContentAsString();
        Course savedCourse=objectMapper.readValue(body,Course.class);
        mockMvc.perform(MockMvcRequestBuilders.delete(COURSE_URL+"/"+savedCourse.getId())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isNoContent());
    }
}