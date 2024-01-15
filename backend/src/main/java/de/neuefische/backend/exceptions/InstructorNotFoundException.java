package de.neuefische.backend.exceptions;

public class InstructorNotFoundException extends Exception {
    public InstructorNotFoundException() {
    }

    public InstructorNotFoundException(String message) {
        super(message);
    }
}
