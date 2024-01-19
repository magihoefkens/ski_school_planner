package de.neuefische.backend.repository;

import de.neuefische.backend.model.Course;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends MongoRepository<Course,String> {
}
