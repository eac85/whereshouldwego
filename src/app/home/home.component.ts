import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { TagItem, Item, Place, Neighborhood, Cuisine } from '../types';
import { FormControl } from '@angular/forms';
import { placesInPhiladelphia } from '../places';
import { SupabaseService } from '../services/supabase.service';
import { Observable, of } from 'rxjs';
import { filter, map , switchMap } from 'rxjs/operators';
import { ModalService } from '../services/modal.service';


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

  cuisines: Cuisine[] = [];
  cuisineNames: string[] = [];

  neighborhoods: Neighborhood[] = [];
  neighborhoodNames: string[] = [];

  autocompleteOptions: string[] = [];

   constructor(private readonly supabase: SupabaseService, private modalService: ModalService) {
    this.filteredPlaces = [...placesInPhiladelphia]; // Copy all places to filteredPlaces initially
    this.allPlacesData$ = this.supabase.getPlaces1();
    this.filteredPlacesData$ = this.filterPlaces();
    this.cuisineHandler();
    this.neighborhoodHandler();
  }

  async cuisineHandler() {
    this.cuisines = await this.supabase.getCuisine();
    this.cuisineNames = this.cuisines.map(cuisine => cuisine.name);
  }

  async neighborhoodHandler() {
    this.neighborhoods = await this.supabase.getNeighborhoods();
    this.neighborhoodNames = this.neighborhoods.map(neighborhood => neighborhood.name);
    this.autocompleteOptions = await ['activity',
    'outside',
    'happy hour',
    'dog friendly',
    ...this.neighborhoodNames,
    ...this.cuisineNames];
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
    const hasCuisine = this.chips.find(chip => [
      "french", "pizza", "american", "vietnamese", "board game cafe", "mexican",
      "japanese", "cocktails", "seafood", "diner", "asian", "wine & cheese",
      "korean", "new american", "whiskey bar", "italian", "bar & grill",
      "malaysian", "spanish", "thai", "cuban", "chinese", "middle eastern"
    ].includes(chip.toLowerCase()));

    const selectedNeighborhood = this.chips.find(chip =>
      ['queen village', 'west philadelphia', 'bella vista', 'south philly', 'fairmount', 'fishtown', 'northern liberties',
        'university city', 'washington square west', 'center city', 'chinatown', 'center city', 'old city', 'east passyunk', 'chinatown',
        'south philadelphia', 'society hill', 'graduate hospital', 'rittenhouse', 'south street', 'logan square'
      ].includes(chip.toLowerCase())
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
}
