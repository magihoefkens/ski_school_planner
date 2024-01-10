package de.neuefische.backend.dto;

import de.neuefische.backend.model.CourseLevel;
import de.neuefische.backend.model.CourseType;
import de.neuefische.backend.model.Participant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class CourseDto {
    private CourseType courseType;
    private CourseLevel courseLevel;
    private String instructorId;
    private List<Participant> participants;
    boolean isCompleted;
}
