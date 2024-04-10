package edu.uab.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CourseModel {
    private IdWrapper _id;
    private String courseName;
    private String level;


    public IdWrapper get_id() {
        return _id;
    }

    public void set_id(IdWrapper _id) {
        this._id = _id;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    

    public static class IdWrapper {
        @JsonProperty("$oid")
        private String oid;

        public String getOid() {
            return oid;
        }

        public void setOid(String oid) {
            this.oid = oid;
        }
    }
}