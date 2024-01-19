package de.neuefische.backend.exceptions;

public class CourseNotFoundException extends Exception{
    public CourseNotFoundException() {
    }

    public CourseNotFoundException(String message) {
        super(message);
    }
}
