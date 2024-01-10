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
    private boolean isSkiInstructor;
    private boolean isSnowboardInstructor;
    private boolean isNordicSkiInstructor;
    private boolean isSegwayInstructor;
    private boolean isHikingGuide;
}