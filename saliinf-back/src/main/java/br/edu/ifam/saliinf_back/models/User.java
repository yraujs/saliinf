package br.edu.ifam.saliinf_back.models;

public class User {
    private String name = "";
    private String department = "";
    private int siap = 00000;
    private String urlPerfil = "";

    User(String name, String department, int siap, String urlPerfil){
        this.name = name;
        this.department = department;
        this.siap = siap;
        this.urlPerfil = urlPerfil;
    }
    
}
