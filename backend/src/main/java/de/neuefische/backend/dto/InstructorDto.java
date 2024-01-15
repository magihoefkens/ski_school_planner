package de.neuefische.backend.dto;

import de.neuefische.backend.model.Qualification;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InstructorDto {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private Qualification qualification;
}
