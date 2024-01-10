package de.neuefische.backend.model;

public enum CourseType {
    SKI("Ski"),
    SNOWBOARD("Snowboard"),
    NORDIC_SKI("Nordic Ski"),
    SEGWAY("Segway"),
    HIKE("Hike");

    private final String displayName;

    CourseType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
