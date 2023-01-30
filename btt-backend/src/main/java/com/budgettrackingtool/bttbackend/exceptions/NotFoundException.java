package com.budgettrackingtool.bttbackend.exceptions;

public class NotFoundException extends RuntimeException{
    public NotFoundException(Long id, String entity)  {
        super("Could not find " + entity + " with id: "+ id);
    }
}
