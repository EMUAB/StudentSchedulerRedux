package edu.uab.repository;

import edu.uab.model.SampleScheduleModel;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface SampleScheduleRepository extends MongoRepository<SampleScheduleModel, String> {
    Optional<SampleScheduleModel> findByDepartmentId(String departmentId);
}