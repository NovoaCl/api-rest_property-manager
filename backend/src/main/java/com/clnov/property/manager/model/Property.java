package com.clnov.property.manager.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "properties")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String propertyType;

    @Column(nullable = false)
    private Integer numberOfRooms;

    @Column(nullable = false)
    private Integer numberOfBathrooms;

    private Boolean hasBalcony;

    private Double squareMeters;

    private String address;

    private Double price;

    @Column(nullable = false)
    private String status;


}