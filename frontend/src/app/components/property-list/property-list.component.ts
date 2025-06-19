import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../models/property.model';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  properties: Property[] = [];
  selectedProperty: Property | null = null;
  isEditing: boolean = false;

  constructor(private propertyService: PropertyService) { }

  ngOnInit(): void {
    this.loadProperties();
  }

  initializeNewProperty(): Property {
    return {
      propertyType: '',
      numberOfRooms: 0, 
      numberOfBathrooms: 0,
      hasBalcony: false, 
      squareMeters: 0,
      address: '',
      price: 0,
      status: 'Available' 
    };
  }

  loadProperties(): void {
    this.propertyService.getAllProperties().subscribe(
      (data) => {
        this.properties = data;
      },
      (error) => {
        console.error('Error fetching properties:', error);
      }
    );
  }

  createProperty(property: Property): void {
    this.propertyService.createProperty(property).subscribe(
      (newProperty) => {
        console.log('Property created:', newProperty);
        this.loadProperties(); 
        this.selectedProperty = null; 
        this.isEditing = false;
      },
      (error) => {
        console.error('Error creating property:', error);
        alert('Error creating property: ' + (error.error || error.message));
      }
    );
  }

  editProperty(property: Property): void {
    this.selectedProperty = { ...property }; 
    this.isEditing = true;
  }

  updateProperty(property: Property): void {
    if (property.id) {
      this.propertyService.updateProperty(property.id, property).subscribe(
        (updatedProperty) => {
          console.log('Property updated:', updatedProperty);
          this.loadProperties(); 
          this.selectedProperty = null; 
          this.isEditing = false;
        },
        (error) => {
          console.error('Error updating property:', error);
          alert('Error updating property: ' + (error.error || error.message));
        }
      );
    }
  }

  deleteProperty(id: number): void {
    if (confirm('Are you sure you want to delete this property?')) {
      this.propertyService.deleteProperty(id).subscribe(
        () => {
          console.log('Property deleted:', id);
          this.loadProperties(); 
        },
        (error) => {
          console.error('Error deleting property:', error);
          alert('Error deleting property: ' + (error.error || error.message));
        }
      );
    }
  }

  onFormSubmit(property: Property): void {
    if (this.isEditing && property.id) {
      this.updateProperty(property);
    } else {
      this.createProperty(property);
    }
  }

  onAddPropertyClick(): void {
    this.selectedProperty = this.initializeNewProperty(); 
    this.isEditing = false;
  }

  cancelForm(): void {
    this.selectedProperty = null;
    this.isEditing = false;
  }
}