package edu.uab.model;

import com.fasterxml.jackson.annotation.JsonProperty;


public class Group extends CourseModel {

    private Integer Student_Group_id;
    private Integer Group_id;
    private String Name;

    public String getId() {
        if (_id != null) {
            return _id.getOid();
        }
        return null;
    }

    public void setId(String id) {
        if (_id == null) {
            _id = new IdWrapper();
        }
        _id.setOid(id);
    }

    public Integer getGroup_id() {
        return Group_id;
    }

    public void setGroup_id(Integer group_id) {
        Group_id = group_id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }
}