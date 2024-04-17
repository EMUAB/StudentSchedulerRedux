package edu.uab.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@Document(collection = "sampleScheduleModel")
public class SampleScheduleModel {

    @Id
    private String id;
    private String departmentId;
    private Map<String, AcademicYear> academicYears;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(String departmentId) {
        this.departmentId = departmentId;
    }

    public Map<String, AcademicYear> getAcademicYears() {
        return academicYears;
    }

    public void setAcademicYears(Map<String, AcademicYear> academicYears) {
        this.academicYears = academicYears;
    }

    @Override
    public String toString() {
        return "SampleScheduleModel{" +
                "id='" + id + '\'' +
                ", departmentId='" + departmentId + '\'' +
                ", academicYears=" + academicYears +
                '}';
    }

    public static class AcademicYear {
        // Map of semesters, where key is "Fall" or "Spring"
        private Map<String, List<Course>> semesters;

        public Map<String, List<Course>> getSemesters() {
            return semesters;
        }

        public void setSemesters(Map<String, List<Course>> semesters) {
            this.semesters = semesters;
        }

        @Override
        public String toString() {
            return "AcademicYear{" +
                    "semesters=" + semesters +
                    '}';
        }
    }

    public static class Course {
        private String name;
        private String hours;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getHours() {
            return hours;
        }

        public void setHours(String hours) {
            this.hours = hours;
        }

        @Override
        public String toString() {
            return "Course{" +
                    "name='" + name + '\'' +
                    ", hours='" + hours + '\'' +
                    '}';
        }
    }
}