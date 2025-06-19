package com.clnov.property.manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.clnov.property.manager.model.Property;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
}
