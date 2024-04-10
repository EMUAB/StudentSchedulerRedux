package edu.uab.repository;

import java.util.List;
import edu.uab.model.CourseModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CourseRepository extends MongoRepository<CourseModel, String> {

    List<CourseModel> findBySubjectContainingIgnoreCase(String searchTerm);

    List<CourseModel> findByCourseNumberContainingIgnoreCase(String searchTerm);

    CourseModel findByCRN(String CRN);
}