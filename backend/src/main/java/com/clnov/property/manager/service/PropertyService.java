package com.clnov.property.manager.service;

import com.clnov.property.manager.model.Property;
import com.clnov.property.manager.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public Optional<Property> getPropertyById(Long id) {
        return propertyRepository.findById(id);
    }

    public Property createProperty(Property property) {

        if (property.getPropertyType() == null || property.getPropertyType().isEmpty()) {
            throw new IllegalArgumentException("Property type is mandatory.");
        }
        if (property.getNumberOfRooms() == null || property.getNumberOfRooms() <= 0) {
            throw new IllegalArgumentException("Number of rooms must be a positive value.");
        }
        if (property.getNumberOfBathrooms() == null || property.getNumberOfBathrooms() < 0) {
            throw new IllegalArgumentException("Number of bathrooms cannot be negative.");
        }
        if (property.getStatus() == null || property.getStatus().isEmpty()) {
            throw new IllegalArgumentException("Property status is mandatory.");
        }

        return propertyRepository.save(property);
    }

    public Property updateProperty(Long id, Property propertyDetails) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found with ID: " + id));

        property.setPropertyType(propertyDetails.getPropertyType());
        property.setNumberOfRooms(propertyDetails.getNumberOfRooms());
        property.setNumberOfBathrooms(propertyDetails.getNumberOfBathrooms());
        property.setHasBalcony(propertyDetails.getHasBalcony());
        property.setSquareMeters(propertyDetails.getSquareMeters());
        property.setAddress(propertyDetails.getAddress());
        property.setPrice(propertyDetails.getPrice());
        property.setStatus(propertyDetails.getStatus());

        return propertyRepository.save(property);
    }

    public void deleteProperty(Long id) {
        if (!propertyRepository.existsById(id)) {
            throw new RuntimeException("Property not found with ID: " + id);
        }
        propertyRepository.deleteById(id);
    }
}