package de.neuefische.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QualificationDto {
    private boolean isSkiInstructor;
    private boolean isSnowboardInstructor;
    private boolean isNordicSkiInstructor;
    private boolean isSegwayInstructor;
    private boolean isHikingGuide;
}
