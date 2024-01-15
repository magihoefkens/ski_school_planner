package de.neuefische.backend.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.dto.InstructorDto;
import de.neuefische.backend.model.Instructor;
import de.neuefische.backend.model.Qualification;
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

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class InstructorControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    private static final String API_URL = "/api/instructors";
    @Test
    void getAllInstructors_shouldReturnEmptyList_WhenCalledInitially() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get(API_URL))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("[]"));
    }

    @Test
    void getAllInstructors_shouldReturnListOfInstructs() throws Exception{
        //GIVEN
        InstructorDto instructorsToAdd=new InstructorDto("John", "Doe", "john.doe@example.com", "123456", new Qualification());
        String instructorToAddAsJson=objectMapper.writeValueAsString(instructorsToAdd);
        MvcResult result=mockMvc.perform(MockMvcRequestBuilders.post(API_URL)
                                   .contentType(MediaType.APPLICATION_JSON)
                .content(instructorToAddAsJson))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andReturn();
        String body=result.getResponse().getContentAsString();
        Instructor savedInstructor= objectMapper.readValue(body, Instructor.class);
        String instructorAsJson=objectMapper.writeValueAsString(savedInstructor);
        //WHEN + THEN
        mockMvc.perform(MockMvcRequestBuilders.get(API_URL + "/" + savedInstructor.getId()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(instructorAsJson));
    }


    @Test
    void getInstructorById_shouldReturnInstructor_whenCalledWithValidId() throws Exception {
        //GIVEN
        InstructorDto instructorsToAdd=new InstructorDto("John", "Doe", "john.doe@example.com", "123456", new Qualification());
        String instructorToAddAsJson=objectMapper.writeValueAsString(instructorsToAdd);
        MvcResult result=mockMvc.perform(MockMvcRequestBuilders.post(API_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(instructorToAddAsJson))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andReturn();
        Instructor savedInstructor=objectMapper.readValue(result.getResponse().getContentAsString(),Instructor.class);
        String instructorAsJson=objectMapper.writeValueAsString(savedInstructor);
        //WHEN + THEN
        mockMvc.perform(MockMvcRequestBuilders.get(API_URL + "/" + savedInstructor.getId()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(instructorAsJson));

    }

    @Test
    void createInstructor() throws Exception{
        InstructorDto instructorDto=new InstructorDto("John", "Doe", "john.doe@example.com", "123456", new Qualification());
        String instructorAsJson=objectMapper.writeValueAsString(instructorDto);
        MvcResult result=mockMvc.perform(MockMvcRequestBuilders.post(API_URL)
                .contentType(MediaType.APPLICATION_JSON)
                .content(instructorAsJson)
        )
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andReturn();
        Instructor savedInstructor=objectMapper.readValue(result.getResponse().getContentAsString(),Instructor.class);
        assertEquals(instructorDto.getFirstName(),savedInstructor.getFirstName());
        assertEquals(instructorDto.getLastName(),savedInstructor.getLastName());
        assertEquals(instructorDto.getEmail(),savedInstructor.getEmail());
        assertNotNull(savedInstructor.getId());

    }

    @Test
    void updateInstructor() throws Exception{
        InstructorDto instructorDtoToAdd=new InstructorDto("John", "Doe", "john.doe@example.com", "123456", new Qualification());
        String instructorToAddAsJson=objectMapper.writeValueAsString(instructorDtoToAdd);
        InstructorDto instructorDtoToUpdate= new InstructorDto("Joe", "Doe", "joe.doe@example.com", "123456", new Qualification());
        String instructorToUpdateAsJson=objectMapper.writeValueAsString(instructorDtoToUpdate);
        MvcResult postResult=mockMvc.perform(MockMvcRequestBuilders.post(API_URL)
                .contentType(MediaType.APPLICATION_JSON)
                .content(instructorToAddAsJson))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andReturn();
        String bodyToAddedInstructor = postResult.getResponse().getContentAsString();
        Instructor addedInstructor=objectMapper.readValue(bodyToAddedInstructor,Instructor.class);
        MvcResult updateResult=mockMvc.perform(MockMvcRequestBuilders.put(API_URL + "/" + addedInstructor.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(instructorToUpdateAsJson))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
        String bodyOfUpdatedInstructor=updateResult.getResponse().getContentAsString();
        Instructor updatedInstructor=objectMapper.readValue(bodyOfUpdatedInstructor,Instructor.class);
        assertEquals(addedInstructor.getId(),updatedInstructor.getId());
        assertEquals(instructorDtoToUpdate.getFirstName(),updatedInstructor.getFirstName());
        assertEquals(instructorDtoToUpdate.getLastName(),updatedInstructor.getLastName());
        assertEquals(instructorDtoToUpdate.getEmail(),updatedInstructor.getEmail());



    }

    @Test
    void deleteInstructor() throws Exception {
        InstructorDto instructorDtoToAdd=new InstructorDto("John", "Doe", "john.doe@example.com", "123456", new Qualification());
        String instructorToAddAsJson=objectMapper.writeValueAsString(instructorDtoToAdd);
        MvcResult postResult=mockMvc.perform(MockMvcRequestBuilders.post(API_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(instructorToAddAsJson))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andReturn();
        String bodyToAddedInstructor = postResult.getResponse().getContentAsString();
        Instructor addedInstructor=objectMapper.readValue(bodyToAddedInstructor,Instructor.class);
        mockMvc.perform(MockMvcRequestBuilders.delete(API_URL + "/" + addedInstructor.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isNoContent());


    }
}