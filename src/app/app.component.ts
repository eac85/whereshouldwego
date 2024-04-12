import { Component } from '@angular/core';
import { TagItem } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'whereshouldwego';
  tags: TagItem[] = [];
  filteredPlaces: any;
  
  constructor() {
    this.filteredPlaces = [...this.placesInPhiladelphia]; // Copy all places to filteredPlaces initially
  }
  
  placesInPhiladelphia = [
    {
      name: 'Amada',
      place: 'Inside',
      activity: false,
      neighborhood: 'Old City',
      happyHour: true,
      color: "white",
    },
    {
      name: 'Angelo’s',
      place: 'Inside',
      activity: false,
      neighborhood: 'Bella Vista',
      happyHour: true,
      color: "white",
    },
    {
      name: 'Abar',
      place: 'Inside',
      activity: false,
      neighborhood: 'Center City',
      happyHour: true,
      color: "white",
    },
    {
      name: 'Assembly',
      place: 'Inside',
      activity: false,
      neighborhood: 'Logan Square',
      happyHour: true,
      color: "white",
    },
    {
      name: 'Al Zhaytouna',
      place: 'Inside',
      activity: false,
      neighborhood: 'West Philadelphia',
      happyHour: true,
      color: "white",
    },
    {
      name: 'Bloomsday',
      place: 'Inside',
      activity: false,
      neighborhood: 'Society Hill',
      happyHour: true,
      color: "#DDA0DD",
    },
    {
      name: 'Barcade',
      place: 'Inside',
      activity: true,
      neighborhood: 'Fishtown',
      happyHour: true,
      color: "white",
    },
    {
      name: 'Bok Bar',
      place: 'Outside',
      activity: false,
      neighborhood: 'South Philadelphia',
      happyHour: true,
      color: "white",
    },
    {
      name: 'Bonchon',
      place: 'Inside',
      activity: false,
      neighborhood: 'Center City',
      happyHour: true,
     color: "white",
    },
    {
      name: 'Barcelona',
      place: 'Inside',
      activity: false,
      neighborhood: 'East Passyunk',
      happyHour: true,
     color: "white",
    },
  {
    name: 'Banh Mi and Bottles',
    place: 'Inside',
    activity: false,
    neighborhood: 'West Philadelphia',
    happyHour: true,
  color: "white"
  },
  {
    name: 'Bridget Foy’s',
    place: 'Inside',
    activity: false,
    neighborhood: 'Queen Village',
    happyHour: true,
  color: "white"
  },
  {
    name: 'Blind Bar',
    place: 'Inside',
    activity: false,
    neighborhood: 'Center City',
    happyHour: true,
  color: "white"
  },
  {
    name: 'Bukchon',
    place: 'Inside',
    activity: false,
    neighborhood: 'Center City',
    happyHour: true,
  color: "white"
  },
  {
    name: 'Blue Corn',
    place: 'Inside',
    activity: false,
    neighborhood: 'Northern Liberties',
    happyHour: true,
  color: "white"
  },
  {
    name: 'Bing Bing Dim Sum',
    place: 'Inside',
    activity: false,
    neighborhood: 'East Passyunk',
    happyHour: true,
  color: "white"
  },
  {
    name: 'Ba Le',
    place: 'Inside',
    activity: false,
    neighborhood: 'Chinatown',
    happyHour: true,
  color: "white"
  },
  {
    name: 'Crunch Chicken',
    place: 'Inside',
    activity: false,
    neighborhood: 'Center City',
    happyHour: true,
  color: "white"
  },
  {
    name: 'Cheu',
    place: 'Inside',
    activity: false,
    neighborhood: 'Fishtown',
    happyHour: true,
  color: "white"
  },
  {
    name: 'Cartesian',
    place: 'Inside',
    activity: false,
    neighborhood: 'East Passyunk',
    happyHour: true,
  color: "white"
  },
  {
    name: 'Cherry Street Pier',
    place: 'Outside',
    activity: 'Various',
    neighborhood: 'Old City',
    happyHour: true,
    color: "#D2042D"
  },
  {
    name: 'Cuba Libre',
    place: 'Inside',
    activity: false,
    neighborhood: 'Old City',
    happyHour: true,
    color: "#9ACD32"
  },
  {
    name: 'Cavs',
    place: 'Inside',
    activity: false,
    neighborhood: 'Various Locations',
    happyHour: true,
  color: "white"
  },
  {
    name: 'Cosmis',
    place: 'Inside',
    activity: false,
    neighborhood: 'West Philadelphia',
    happyHour: true,
   color: "white"
  },
  {
    name: 'Circles',
    place: 'Inside',
    activity: false,
    neighborhood: 'Northern Liberties',
    happyHour: true,
   color: "white"
  },
  {
    name: 'Cafe le Maude',
    place: 'Inside',
    activity: false,
    neighborhood: 'Northern Liberties',
    happyHour: true,
   color: "white"
  },
  {
    name: 'Chinatown Beer Garden',
    place: 'Outside',
    activity: true,
    neighborhood: 'Chinatown',
    happyHour: true,
   color: "white"
  },
  {
    name: 'Dizengoff',
    place: 'Inside',
    activity: false,
    neighborhood: 'Center City',
    happyHour: true,
   color: "white"
  },
  {
    name: 'Dig',
    place: 'Inside',
    activity: false,
    neighborhood: 'Queen Village',
    happyHour: true,
     color: "white"
  },
  {
    name: 'Double Knot',
    place: 'Inside',
    activity: false,
    neighborhood: 'washington square west',
    happyHour: true,
     color: "white"
  },
  {
    name: 'Dandelion',
    place: 'Inside',
    activity: false,
    neighborhood: 'Center City Square',
    happyHour: true,
   color: "white"
  },
  {
    name: 'Dim Sum Garden',
    place: 'Inside',
    activity: false,
    neighborhood: 'Chinatown',
    happyHour: true,
     color: "white"
  },
  {
    name: 'Don Chuchos',
    place: 'Inside',
    activity: false,
    neighborhood: 'South Philly',
    happyHour: true,
     color: "white"
  },
  {
    name: 'Evil Genius',
    place: 'Inside',
    activity: false,
    neighborhood: 'Fishtown',
    happyHour: true,
   color: "white"
  },
  {
    name: 'Emmy Squared',
    place: 'Inside',
    activity: false,
    neighborhood: 'Queen Village',
    happyHour: true,
   color: "white"
  },
  {
    name: 'El Bar',
    place: 'Outside',
    activity: false,
    neighborhood: 'Northern Liberties',
    happyHour: true,
   color: "white"
  },
  {
    name: 'El Techo',
    place: 'Outside',
    activity: false,
    neighborhood: 'University City',
    happyHour: true,
   color: "white"
  },
  {
    name: 'Frankford Hall',
    place: 'Outside',
    activity: false,
    neighborhood: 'Fishtown',
    happyHour: true,
     color: "white"
  },
  {
    name: 'Fette Sau',
    place: 'Inside',
    activity: false,
    neighborhood: 'Fishtown',
    happyHour: true,
   color: "white"
  },
  {
    name: 'Federal Donuts',
    place: 'Inside',
    activity: false,
    neighborhood: 'Center City',
    happyHour: true,
   color: "white"
  },
  {
    name: 'Franky Bradley’s',
    place: 'Inside',
    activity: false,
    neighborhood: 'washington square west',
    happyHour: true,
     color: "white"
  },
  {
    name: 'Garage',
    place: 'Inside',
    activity: true,
    neighborhood: 'Fishtown',
    happyHour: true,
     color: "white"
  },
  {
    name: 'Garage',
    place: 'Inside',
    activity: true,
    neighborhood: 'South Philly',
    happyHour: true,
     color: "white"
  },
  {
    name: 'South Bowl',
    place: 'Inside',
    activity: true,
    neighborhood: 'South Philly',
    happyHour: true,
     color: "white"
  },
  {
    name: 'Fitzwater Cafe',
    place: 'Inside',
    activity: false,
    neighborhood: 'Bella Vista',
    happyHour: true,
     color: "white"
  },
  {
    name: 'Fourth Street Deli',
    place: 'Inside',
    activity: false,
    neighborhood: 'Queen Village',
    happyHour: true,
   color: "white"
  },
  {
    name: 'Fountain Porter',
    place: 'Inside',
    activity: false,
    neighborhood: 'East Passyunk',
    happyHour: true,
   color: "white"
  },
  {
    name: 'Goldie',
    place: 'Inside',
    activity: false,
    neighborhood: 'Center City',
    happyHour: true,
   color: "white"
  },
  {
    name: 'Graffiti Bar',
    place: 'Inside',
    activity: false,
    neighborhood: 'washington square west',
    happyHour: true,
     color: "white"
  },
  {
    name: 'Giorgios',
    place: 'Inside',
    activity: false,
    neighborhood: 'Bella Vista',
    happyHour: true,
     color: "white"
  },
  {
    name: 'Harp and Crown',
    place: 'Inside',
    activity: false,
    neighborhood: 'Center City',
    happyHour: true,
     color: "white"
  },
  {
    name: 'Hale and True',
    place: 'Inside',
    activity: false,
    neighborhood: 'Bella Vista',
    happyHour: true,
     color: "#FFA07A"
  },
  {
    name: 'The Halal Guys',
    place: 'Outside',
    activity: false,
    neighborhood: 'University City',
    happyHour: true,
   color: "white"
  },
  {
    name: 'Happy Rooster',
    place: 'Inside',
    activity: false,
    neighborhood: 'Fishtown',
    happyHour: true,
   color: "white"
  },
  {
    name: 'Isgro',
    place: 'Inside',
    activity: false,
    neighborhood: 'Bella Vista',
    happyHour: true,
     color: "white"
  },
  {
    name: 'Irwin’s',
    place: 'Outside',
    activity: false,
    neighborhood: 'South Philly',
    happyHour: true,
   color: "white"
  },
  {
    name: 'Jaxx Beer Boutique',
    place: 'Inside',
    activity: false,
    neighborhood: 'Queen Village',
    happyHour: true,
     color: "white"
  },
  {
    name: 'Johnny Brenda’s',
    place: 'Inside',
    activity: false,
    neighborhood: 'Fishtown',
    happyHour: true,
    color: "white"
  },
  {
    name: 'Kalaya',
    place: 'Inside',
    activity: false,
    neighborhood: 'Fishtown',
    happyHour: true,
    color: "white",
  },
  {
    name: 'Laser Wolf',
    place: 'Inside',
    activity: false,
    neighborhood: 'Fishtown',
    happyHour: true,
    color: "white",
  },
  {
    name: "The Love",
    place: "Inside",
    activity: false,
    neighborhood: "Center City",
    happyHour: true,
     color: "white"
  },
  {
    name: "Le Caveau",
    place: "Inside",
    activity: false,
    neighborhood: "Bella Vista",
    happyHour: true,
     color: "white"
  },
  {
    name: "Locust Rendezvous",
    place: "Inside",
    activity: false,
    neighborhood: "Washington Square West",
    happyHour: true,
     color: "white"
  },
  {
    name: "Lazeez",
    place: "Inside",
    activity: false,
    neighborhood: "Bella Vista",
    happyHour: false,
     color: "white"
  },
  {
    name: "Love Potion",
    place: "Inside",
    activity: false,
    neighborhood: "Graduate Hospital",
    happyHour: true,
    color: "#FFC0CB"
  },
  {
    name: "Oloroso",
    place: "Inside",
    activity: false,
    neighborhood: "Washington Square West",
    happyHour: true,
    color: "white"
  },
  {
    name: "Parc",
    place: "Inside",
    activity: false,
    neighborhood: "Center City",
    happyHour: true,
    color: "white"
  },
  {
    name: "LMNO",
    place: "Inside",
    activity: false,
    neighborhood: "Fishtown",
    happyHour: true,
    color: "black"
  },
  {
    name: "La Calaca Feliz",
    place: "Inside",
    activity: false,
    neighborhood: "Fairmount",
    happyHour: true,
     color: "white"
  },
  {
    name: "La Chinesca",
    place: "Inside",
    activity: false,
    neighborhood: "Fishtown",
    happyHour: true,
     color: "white"
  },
  {
    name: "Middle Child",
    place: "Inside",
    activity: false,
    neighborhood: "Fishtown",
    happyHour: true,
     color: "white"
  },
  {
    name: "Merkaz",
    place: "Inside",
    activity: false,
    neighborhood: "University City",
    happyHour: true,
     color: "white"
  },
  {
    name: "Mission Taqueria",
    place: "Inside",
    activity: false,
    neighborhood: "Center City",
    happyHour: true,
     color: "white"
  },
  {
    name: "McGillan's",
    place: "Inside",
    activity: false,
    neighborhood: "washington square west",
    happyHour: true,
     color: "white"
  },
  {
    name: "Masala Kitchen",
    place: "Inside",
    activity: false,
    neighborhood: "Graduate Hospital",
    happyHour: true,
     color: "white"
  },
  {
    name: "Nunu",
    place: "Inside",
    activity: false,
    neighborhood: "washington square west",
    happyHour: true,
     color: "white"
  },
  {
    name: "New Wave Cafe",
    place: "Inside",
    activity: false,
    neighborhood: "Queen Village",
    happyHour: true,
    color: "#FFFACD"
  },
  {
    name: "Nirvana",
    place: "Inside",
    activity: false,
    neighborhood: "Queen Village",
    happyHour: true,
     color: "white"
  },
  {
    name: "Mish Mish",
    place: "Outside",
    activity: false,
    neighborhood: "South Philly",
    happyHour: true,
    color: "peachpuff"
  },
  {
    name: "North Third",
    place: "Inside",
    activity: false,
    neighborhood: "Washington Square West",
    happyHour: true,
    color: "white"
  },
  {
    name: "Oyster Bar",
    place: "Inside",
    activity: false,
    neighborhood: "washington square west",
    happyHour: true,
    color: "navy"
  }
    // Add more places here
  ];
  
  filterPlaces() {
    this.filteredPlaces = this.placesInPhiladelphia.filter(place => {
      const searchText = this.tags.map(tag => tag.display.toLowerCase()).join(' ');
  
      // Check if all required tags are present
      const hasHappyHourTag = this.tags.some(tag => tag.display.toLowerCase() === 'happy hour');
      const hasActivityTag = this.tags.some(tag => tag.display.toLowerCase() === 'activity');
      const location = this.tags.find(tag =>
        ['outside', 'inside'].includes(tag.display.toLowerCase())
      );
      const selectedNeighborhood = this.tags.find(tag =>
        ['queen village', 'west philadelphia', 'bella vista', 'south philly', 'fairmount', 'fishtown', 'northern liberties',
          'university city', 'washington square west', 'center city', 'chinatown', 'center city', 'old city', 'east passyunk', 'chinatown',
          'south philadelphia'
        ].includes(tag.display.toLowerCase())
      );
  
      // Check if the place meets all tag criteria
      const meetsCriteria =
        (!hasHappyHourTag || place.happyHour) &&
        (!hasActivityTag || place.activity) &&
        (!location || place.place.toLowerCase() === location.display.toLowerCase()) &&
        (!selectedNeighborhood || place.neighborhood.toLowerCase() === selectedNeighborhood.display.toLowerCase());
  
      return meetsCriteria;
    });
  }
  
  
}
