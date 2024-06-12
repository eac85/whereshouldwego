import { Component, Input } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { SupabaseService } from '../services/supabase.service';
import { Neighborhood, Cuisine } from '../types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import necessary form-related modules


export interface Restaurant {
  name: string;
  outdoor_seating: boolean | null;
  activity: boolean | null;
  happy_hour: boolean | null;
  color: string;
  dog_friendly: boolean | null;
  neighborhood_id: number;
  cuisine_id: number;
}


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() isVisible = false;
  neighborhoods: Neighborhood[] = [];
  cuisines: Cuisine[] = [];

  restaurant: Restaurant = {
    name: '',
    outdoor_seating: null,
    activity: null,
    happy_hour: null,
    color: 'white',
    dog_friendly: null,
    neighborhood_id: 0,
    cuisine_id: 0,
    }
  

  constructor(private modalService: ModalService, private readonly supabase: SupabaseService) {
    this.modalService.modalVisibilityChange.subscribe(isVisible => {
      this.isVisible = isVisible;
    });
  }

  ngOnInit() {
    this.loadNeighborhoods();
    this.loadCuisines();
  }

  async loadNeighborhoods() {
    try {
      this.neighborhoods = await this.supabase.getNeighborhoods();
    } catch (error) {
      console.error('Error fetching neighborhood:', error);
    }
  }

  async loadCuisines() {
    try {
      this.cuisines = await this.supabase.getCuisine();
    } catch (error) {
      console.error('Error fetching cuisine:', error);
    }
  }

  closeModal() {
    this.modalService.hideModal();
  }

  onSubmit() {
    // Handle form submission
    console.log('Restaurant added:', this.restaurant);
    this.supabase.savePlace(this.restaurant);
    this.closeModal();
    this.clearForm();
  }

  clearForm() {
    let restaurant = {
      name: '',
      outdoor_seating: null,
      activity: null,
      happy_hour: null,
      color: 'white',
      dog_friendly: null,
      neighborhood_id: 0,
      cuisine_id: 0,
    }
    this.restaurant = restaurant;
  }
}
