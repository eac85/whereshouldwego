import { Component, ElementRef, ViewChild } from '@angular/core';
import { TagItem, Item } from './types';
import { FormControl } from '@angular/forms';
import { placesInPhiladelphia } from './places';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent {
  title = 'whereshouldwego';
  tags: TagItem[] = [];
  filteredPlaces: any;
  colorFilter: boolean = true;
  autocompleteOptions: string[] = ['queen village', 'west philadelphia', 'bella vista', 'south philly', 'fairmount', 'fishtown', 'northern liberties',
  'university city', 'washington square west', 'center city', 'chinatown', 'center city', 'old city', 'east passyunk', 'chinatown',
  'south philadelphia', 'activity', 'outside', 'happy hour',  "french", "dog friendly", "chinese",
  "pizza",
  "american",
  "vietnamese",
  "board game cafe",
  "mexican",
  "japanese",
  "cocktails",
  "seafood",
  "diner",
  "asian fusion",
  "wine & cheese",
  "korean",
  "new american",
  "whiskey bar",
  "italian",
  "bar & grill",
  "malaysian"];

  constructor() {
    this.filteredPlaces = [...placesInPhiladelphia]; // Copy all places to filteredPlaces initially
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
  
 
  

  filterPlaces() {
    this.filteredPlaces = placesInPhiladelphia.filter(place => {
      const searchText = this.chips.map(chip => chip.toLowerCase()).join(' ');
  
      // Check if all required tags are present
      const hasHappyHourTag = this.chips.some(chip => chip.toLowerCase() === 'happy hour');
      const hasDogFriendlyTag = this.chips.some(chip => chip.toLowerCase() === 'dog friendly');
      const hasActivityTag = this.chips.some(chip => chip.toLowerCase() === 'activity');
      const location = this.chips.find(chip =>
        ['outside', 'inside'].includes(chip.toLowerCase())
      );
      const hasCuisine = this.chips.find(chip => [
        "french",
        "pizza",
        "american",
        "vietnamese",
        "board game cafe",
        "mexican",
        "japanese",
        "cocktails",
        "seafood",
        "diner",
        "asian",
        "wine & cheese",
        "korean",
        "new american",
        "whiskey bar",
        "italian",
        "bar & grill",
        "malaysian",
        "spanish",
        "thai",
        "cuban",
        "chinese",
        "middle eastern"
      ].includes(chip.toLowerCase()));
      
      const selectedNeighborhood = this.chips.find(chip =>
        ['queen village', 'west philadelphia', 'bella vista', 'south philly', 'fairmount', 'fishtown', 'northern liberties',
          'university city', 'washington square west', 'center city', 'chinatown', 'center city', 'old city', 'east passyunk', 'chinatown',
          'south philadelphia', 'society hill', 'graduate hospital', 'rittenhouse', 'south street', 'logan square'
        ].includes(chip.toLowerCase())
      );
  
      // Check if the place meets all tag criteria
      const meetsCriteria =
        (!hasHappyHourTag || place.happyHour) &&
        (!hasActivityTag || place.activity) &&
        (!hasDogFriendlyTag || place.dogFriendly) &&
        (!location || place.place.toLowerCase() === location.toLowerCase()) &&
        (!selectedNeighborhood || place.neighborhood.toLowerCase() === selectedNeighborhood.toLowerCase()) &&
        (!hasCuisine || (place.cuisine == undefined ? false : place.cuisine.toLowerCase() === hasCuisine.toLowerCase()));
  
      return meetsCriteria;
    });
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

 
  
  
}
