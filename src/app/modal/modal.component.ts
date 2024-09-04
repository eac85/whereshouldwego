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
  cuisine_id: number | null;
  id: number | null
}


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() isVisible = false;
  @Input() place: any;

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
    id: null
    }
  
    existing = false;

    constructor(private modalService: ModalService, private readonly supabase: SupabaseService) {
      this.modalService.modalVisibilityChange.subscribe(({ isVisible, place }) => {
        this.isVisible = isVisible;
        this.place = place;
        if(place == null){
          this.clearForm();
        }
        if (place != null){
          this.restaurant = {
            name: this.place.name.toLowerCase(),
            outdoor_seating: this.place.outdoor_seating ? this.place.outdoor_seating : null,
            activity: this.place.activity ? this.place.activity : null,
            happy_hour: this.place.happy_hour ? this.place.happy_hour : null,
            color: this.place.color,
            dog_friendly: this.place.dog_friendly ? this.place.dog_friendly : null,
            neighborhood_id: this.place.neighborhood.id,
            cuisine_id: this.place.cuisine ? this.place.cuisine.id : null,
            id: place.id
          }
        }
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
    if(this.restaurant.id != 0){
      console.log("this is an edit");
      this.supabase.editPlace(this.restaurant);
    }
    else {
      // Handle form submission
      this.restaurant.id = null;
      console.log('Restaurant added:', this.restaurant);
      this.supabase.savePlace(this.restaurant);
    }
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
      id: 0
    }
    this.restaurant = restaurant;
  }

   hexToRGB(hex:string, alpha: number) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }

  getCuisineName(id: number) {
    const item = this.cuisines.find(item => item.id === id);
    return item ? item.name : undefined;
  }

  getNeighborhoodName(id: number) {
    const item = this.neighborhoods.find(item => item.id === id);
    return item ? item.name : undefined;
  }

  textContent: string = 'Click to edit this text';

  // Method to make the text editable
  makeEditable(element: HTMLElement) {
    element.setAttribute('contenteditable', 'true');
    element.focus(); // Focus on the element so the user can start typing
  }

  // Method to save the edited text when the element loses focus
  saveText(element: HTMLElement) {
    element.setAttribute('contenteditable', 'false');
    this.textContent = element.innerText; // Update the textContent property
  }

}
