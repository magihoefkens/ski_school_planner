package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Qualification {
    private Boolean isSkiInstructor;
    private Boolean isSnowboardInstructor;
    private Boolean isNordicSkiInstructor;
    private Boolean isSegwayInstructor;
    private Boolean isHikingGuide;
}
