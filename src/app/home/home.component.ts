import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { TagItem, Item, Place, Neighborhood, Cuisine } from '../types';
import { FormControl } from '@angular/forms';
import { placesInPhiladelphia } from '../places';
import { SupabaseService } from '../services/supabase.service';
import { Observable, of } from 'rxjs';
import { filter, map , switchMap } from 'rxjs/operators';
import { ModalService } from '../services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})


export class HomeComponent {
  title = 'whereshouldwego';
  tags: TagItem[] = [];
  filteredPlaces: any;
  colorFilter: boolean = true;
  allPlacesData$: Observable<any>;
  filteredPlacesData$: Observable<any>;
  selectedPlace: any = null;
  isFilterVisible=false;
  emailForm: FormGroup;
  showEmailForm = false; // Controls form visibility
  cuisines: Cuisine[] = [];
  cuisineNames: string[] = [];

  neighborhoods: Neighborhood[] = [];
  neighborhoodNames: string[] = [];

   autocompleteOptions: string[] = [];

  constructor(private readonly supabase: SupabaseService, private modalService: ModalService, private fb: FormBuilder) {
    this.filteredPlaces = [...placesInPhiladelphia]; // Copy all places to filteredPlaces initially
    this.allPlacesData$ = this.supabase.getPlaces1();
    this.filteredPlacesData$ = this.filterPlaces();
    this.initializeAutocompleteOptions();
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async initializeAutocompleteOptions() {
    await Promise.all([this.cuisineHandler(), this.neighborhoodHandler()]); // Ensure both handlers complete

    // Combine cuisine and neighborhood names for autocomplete options
    this.autocompleteOptions = [
        'activity', 
        ...this.cuisineNames,  // Include cuisine names
        'outside',
        'happy hour',
        'dog friendly',
        ...this.neighborhoodNames // Include neighborhood names
    ];
}

  async cuisineHandler() {
    this.cuisines = await this.supabase.getCuisine();
    this.cuisineNames =  this.cuisines.map(cuisine => cuisine.name);
    console.log("Cuisine Names:", this.cuisineNames); // Check the data
    this.autocompleteOptions =  [
      ...this.cuisineNames,
     ];
  }

  async neighborhoodHandler() {
    this.neighborhoods = await this.supabase.getNeighborhoods();
    this.neighborhoodNames =  this.neighborhoods.map(neighborhood => neighborhood.name);
    console.log("neighborhood Names:", this.neighborhoodNames); // Check the data
    this.autocompleteOptions =  [
    ...this.neighborhoodNames,
   ];
  }

  chipInput = new FormControl();
  chips: string[] = [];

  addChip(value: string): void {
    const trimmedValue = value.trim();
    if (trimmedValue && !this.chips.includes(trimmedValue)) {
      this.chips.push(trimmedValue);
    }
  }
  removeChip(chip: string): void {
    const index = this.chips.indexOf(chip);
    if (index >= 0) {
      this.chips.splice(index, 1);
    }
    this.filterPlaces();
  }

  removeLastChip(): void {
    if (this.chips.length > 0) {
      this.chips.pop(); // Remove the last chip
    }
    this.filterPlaces();
  }

  selected(input: string): void {
    this.chips.push(input);
  }

  surpriseMe() {
    this.chips = [];
    const randomTags = this.getRandomItemsFromCategories(placesInPhiladelphia);
    this.chips.push(randomTags.neighborhood.toLowerCase());
    if(randomTags.activity){
      this.chips.push('activity');
    }
    if(randomTags.happyHour){
      this.chips.push('happy hour');
    }
    if(randomTags.cuisine && Math.floor(Math.random() * 4) + 1 < 2){
      this.chips.push(randomTags.cuisine.toLowerCase());
    }
    this.filterPlaces();
  }

  getRandomItem<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  getRandomItemsFromCategories(items: Item[]): { name: string, place: string, activity: boolean, happyHour: boolean, neighborhood: string, cuisine?: string } {
    const locationItems = items.filter(item => item.place !== undefined); // Filter items by location
    const activityItems = items.filter(item => item.activity !== undefined); // Filter items by activity
    const happyHourItems = items.filter(item => item.happyHour !== undefined); // Filter items by happy hour
    const neighborhoods = items.filter(item => item.neighborhood !== undefined); // Filter items by neighborhood
    const cuisines = items.filter(item => item.cuisine !== undefined); // Filter items by neighborhood

    const randomLocation = this.getRandomItem(locationItems);
    const randomActivity = this.getRandomItem(activityItems);
    const randomHappyHour = this.getRandomItem(happyHourItems);
    const randomNeighborhood = this.getRandomItem(neighborhoods);
    const randomCuisine = this.getRandomItem(cuisines);

    return { name: randomLocation.name, place: randomLocation.place, activity: randomActivity.activity, happyHour: randomHappyHour.happyHour, neighborhood: randomNeighborhood.neighborhood, cuisine: randomCuisine.cuisine };
  }
  
  getFilteredPlaces(places: any[]): Observable<any[]> {
    const searchText = this.chips.map(chip => chip.toLowerCase()).join(' ');

    const hasHappyHourTag = this.chips.some(chip => chip.toLowerCase() === 'happy hour');
    const hasDogFriendlyTag = this.chips.some(chip => chip.toLowerCase() === 'dog friendly');
    const hasActivityTag = this.chips.some(chip => chip.toLowerCase() === 'activity');
    const location = this.chips.find(chip =>
      ['outside', 'inside'].includes(chip.toLowerCase())
    );
   
    const hasCuisine = this.chips.find(chip => 
      this.cuisineNames.map(cuisine => cuisine.toLowerCase()).includes(chip.toLowerCase())
    );

    const selectedNeighborhood = this.chips.find(chip => 
      this.neighborhoodNames.map(neighborhood => neighborhood.toLowerCase()).includes(chip.toLowerCase())
    );

    return of(places.filter(place => {
      // Check if the place meets all tag criteria
      const meetsCriteria =
        (!hasHappyHourTag || place.happy_hour) &&
        (!hasActivityTag || place.activity) &&
        (!hasDogFriendlyTag || place.dog_friendly) &&
        (!location || place.outdoor_seating) &&
        (!selectedNeighborhood || place.neighborhood.name.toLowerCase() === selectedNeighborhood.toLowerCase()) &&
        (!hasCuisine || (place.cuisine == undefined ? false : place.cuisine.name.toLowerCase() === hasCuisine.toLowerCase()));

      return meetsCriteria;
    }));
  }

  // Call this method whenever the chips change
  filterPlaces()  {
    return this.filteredPlacesData$ = this.allPlacesData$.pipe(
      switchMap(places => this.getFilteredPlaces(places)),

    );
  }

  colorFilterToggle() {
    this.colorFilter = !this.colorFilter;
  }


  shuffleTags(){
    let newTag: TagItem = { display: 'Queen Village', value: 'queen village' };
    let activity: TagItem = { display:  'activity', value: 'activity' };

    this.tags.push(newTag);
    this.tags.push(activity);

  }

  addPlace(){
    alert(this.chips);
  }

  openModal(restaurant:any) {
    this.modalService.showModal(restaurant);
  }

  openPlaceModal(event: MouseEvent, place: any) {
    const tile = event.target as HTMLElement;
    const rect = tile.getBoundingClientRect();
    const middleX = rect.left + rect.width / 2;
    const middleY = rect.top + rect.height / 2;


    const modalWidth = 150; 
    const modalHeight = 150; 
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const modalX = middleX - modalWidth / 2;
    const modalY = (middleY + scrollY) - modalHeight / 2;
    
    this.selectedPlace = place;
    this.modalService.showPlaceModal(true, place, { x: modalX, y: modalY });

  }
  
  closePlaceModal() {
    this.selectedPlace = null;
  }

  showFilter() {
    console.log("helllllo");
    console.log(this.isFilterVisible);
    this.isFilterVisible = !this.isFilterVisible;
  }

  onSubmit() {
    if (this.emailForm.valid) {
      console.log('Email submitted:', this.emailForm.value.email);
      this.supabase.saveEmail( this.emailForm.value.email);
      // Handle subscription logic here (e.g., sending the email to a backend API)
    }
  }

  toggleEmailForm() {
    this.showEmailForm = !this.showEmailForm;
  }

}
