import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Property } from '../../models/property.model';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.css']
})
export class PropertyFormComponent implements OnChanges {

  @Input() property: Property | null = null; 
  @Input() isEditing: boolean = false; 

  @Output() formSubmitted = new EventEmitter<Property>();
  @Output() formCancelled = new EventEmitter<void>();

  currentProperty: Property = this.resetForm();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['property'] && changes['property'].currentValue) {
      this.currentProperty = { ...changes['property'].currentValue };
    } else if (changes['property'] && !changes['property'].currentValue && !this.isEditing) {
      this.currentProperty = this.resetForm();
    }
  }

  resetForm(): Property {
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

  onSubmit(): void {
    this.formSubmitted.emit(this.currentProperty);
  }

  onCancel(): void {
    this.formCancelled.emit();
    this.currentProperty = this.resetForm(); 
  }
}