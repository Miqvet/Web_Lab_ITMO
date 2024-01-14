package com.example.backend.model;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DataRequest {
    @NotNull(message = "X cannot be null")
    @DecimalMin(value = "-6")
    @DecimalMax(value = "6")
    private Double x;

    @NotNull(message = "Y cannot be null")
    @DecimalMin(value = "-6")
    @DecimalMax(value = "6")
    private Double y;

    @NotNull(message = "R cannot be null")
    @DecimalMin(value = "0")
    private Double r;
}
