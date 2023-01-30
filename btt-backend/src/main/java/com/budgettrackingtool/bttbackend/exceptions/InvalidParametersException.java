package com.budgettrackingtool.bttbackend.exceptions;

public class InvalidParametersException extends RuntimeException{

    public InvalidParametersException(String entity)  {
        super("Invalid parameters provided for entity " + entity);
    }

    public InvalidParametersException()  {
        super("Invalid parameters provided for entity ");
    }
}
