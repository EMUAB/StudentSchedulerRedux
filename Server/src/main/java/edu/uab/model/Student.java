package edu.uab.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import edu.uab.model.CourseModel;

public class Student extends CourseModel {

    private Integer Student_id;
    private String First_Name;
    private String Last_Name;

    public Integer getStudent_id() {
        return Student_id;
    }

    public void setStudent_id(Integer student_id) {
        Student_id = student_id;
    }

    public String getFirst_Name() {
        return First_Name;
    }

    public void setFirst_Name(String first_Name) {
        First_Name = first_Name;
    }

    public String getLast_Name() {
        return Last_Name;
    }

    public void setLast_Name(String last_Name) {
        Last_Name = last_Name;
    }
    

    
}
