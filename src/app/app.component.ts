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
  colorFilter: boolean = true;
  
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
      color: "#FCB68A",
    },
    {
      name: 'Angelo’s',
      place: 'Inside',
      activity: false,
      neighborhood: 'Bella Vista',
      happyHour: true,
      color: "FireBrick",
    },
    {
      name: 'Abar',
      place: 'Inside',
      activity: false,
      neighborhood: 'Center City',
      happyHour: true,
      color: "DimGray",
    },
    {
      name: 'Assembly',
      place: 'Inside',
      activity: false,
      neighborhood: 'Logan Square',
      happyHour: true,
      color: "pearl",
    },
    {
      name: 'Al Zhaytouna',
      place: 'Inside',
      activity: false,
      neighborhood: 'West Philadelphia',
      happyHour: true,
      color: "#8DCCEF",
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
      color: "#8DCCEF",
    },
    {
      name: 'Bok Bar',
      place: 'Outside',
      activity: false,
      neighborhood: 'South Philadelphia',
      happyHour: true,
      color: "SeaShell",
    },
    {
      name: 'Bonchon',
      place: 'Inside',
      activity: false,
      neighborhood: 'Center City',
      happyHour: true,
     color: "#EDE2D5",
    },
    {
      name: 'Barcelona',
      place: 'Inside',
      activity: false,
      neighborhood: 'East Passyunk',
      happyHour: true,
     color: "#4A6C50",
    },
  {
    name: 'Banh Mi and Bottles',
    place: 'Inside',
    activity: false,
    neighborhood: 'Queen Village',
    happyHour: true,
  color: "#6287C5"
  },
  {
    name: 'Bridget Foy’s',
    place: 'Inside',
    activity: false,
    neighborhood: 'Queen Village',
    happyHour: true,
  color: "tomato"
  },
  {
    name: 'Blind Barber',
    place: 'Inside',
    activity: false,
    neighborhood: 'Center City',
    happyHour: true,
  color: "whitesmoke"
  },
  {
    name: 'Bukchon',
    place: 'Inside',
    activity: false,
    neighborhood: 'Center City',
    happyHour: true,
  color: "#F8D293"
  },
  {
    name: 'Blue Corn',
    place: 'Inside',
    activity: false,
    neighborhood: 'Northern Liberties',
    happyHour: true,
  color: "#BCDEEB"
  },
  {
    name: 'Bing Bing Dim Sum',
    place: 'Inside',
    activity: false,
    neighborhood: 'East Passyunk',
    happyHour: true,
  color: "steelblue"
  },
  {
    name: 'Ba Le',
    place: 'Inside',
    activity: false,
    neighborhood: 'Chinatown',
    happyHour: true,
  color: "#977692"
  },
  {
    name: 'Crunch Chicken',
    place: 'Inside',
    activity: false,
    neighborhood: 'Center City',
    happyHour: true,
  color: "#E8BB6F"
  },
  {
    name: 'Cheu',
    place: 'Inside',
    activity: false,
    neighborhood: 'Fishtown',
    happyHour: true,
  color: "#F4C443"
  },
  {
    name: 'Cartesian',
    place: 'Inside',
    activity: false,
    neighborhood: 'East Passyunk',
    happyHour: true,
  color: "brown"
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
    name: 'Cavanaugh`s',
    place: 'Inside',
    activity: false,
    neighborhood: 'Society Hill',
    happyHour: true,
  color: "#F59985"
  },
  {
    name: 'Cosmis',
    place: 'Inside',
    activity: false,
    neighborhood: 'West Philadelphia',
    happyHour: true,
   color: "navy"
  },
  {
    name: 'Circles',
    place: 'Inside',
    activity: false,
    neighborhood: 'Northern Liberties',
    happyHour: true,
   color: "orange"
  },
  {
    name: 'Cafe le Maude',
    place: 'Inside',
    activity: false,
    neighborhood: 'Northern Liberties',
    happyHour: true,
   color: "black"
  },
  {
    name: 'Chinatown Beer Garden',
    place: 'Outside',
    activity: true,
    neighborhood: 'Chinatown',
    happyHour: true,
   color: "#E85636"
  },
  {
    name: 'Dizengoff',
    place: 'Inside',
    activity: false,
    neighborhood: 'Center City',
    happyHour: true,
   color: "#E64F99"
  },
  {
    name: 'Dig',
    place: 'Inside',
    activity: false,
    neighborhood: 'Queen Village',
    happyHour: true,
     color: "YellowGreen"
  },
  {
    name: 'Double Knot',
    place: 'Inside',
    activity: false,
    neighborhood: 'washington square west',
    happyHour: true,
     color: "#FBEFD8"
  },
  {
    name: 'Dandelion',
    place: 'Inside',
    activity: false,
    neighborhood: 'Center City Square',
    happyHour: true,
   color: "LightGoldenrodYellow"
  },
  {
    name: 'Dim Sum Garden',
    place: 'Inside',
    activity: false,
    neighborhood: 'Chinatown',
    happyHour: true,
     color: "#F34615"
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
   color: "#BBDAB1"
  },
  {
    name: 'Emmy Squared',
    place: 'Inside',
    activity: false,
    neighborhood: 'Queen Village',
    happyHour: true,
   color: "#F5A0BB"
  },
  {
    name: 'El Bar',
    place: 'Outside',
    activity: false,
    neighborhood: 'Northern Liberties',
    happyHour: true,
   color: "#AAA9AA"
  },
  {
    name: 'El Techo',
    place: 'Outside',
    activity: false,
    neighborhood: 'University City',
    happyHour: true,
   color: "#FFC300"
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
   color: "#077918"
  },
  {
    name: 'Federal Donuts',
    place: 'Inside',
    activity: false,
    neighborhood: 'Center City',
    happyHour: true,
   color: "#E84235"
  },
  {
    name: 'Franky Bradley’s',
    place: 'Inside',
    activity: false,
    neighborhood: 'washington square west',
    happyHour: true,
     color: "#E1E5CE"
  },
  {
    name: 'Garage',
    place: 'Inside',
    activity: true,
    neighborhood: 'Fishtown',
    happyHour: true,
     color: "#E0FF5B"
  },
  {
    name: 'Garage',
    place: 'Inside',
    activity: true,
    neighborhood: 'South Philly',
    happyHour: true,
     color: "#7B940F"
  },
  {
    name: 'South Bowl',
    place: 'Inside',
    activity: true,
    neighborhood: 'South Philly',
    happyHour: true,
     color: "#62677F"
  },
  {
    name: 'Fitzwater Cafe',
    place: 'Inside',
    activity: false,
    neighborhood: 'Bella Vista',
    happyHour: true,
     color: "#B7D6EE"
  },
  {
    name: 'Fourth Street Deli',
    place: 'Inside',
    activity: false,
    neighborhood: 'Queen Village',
    happyHour: true,
   color: "#92D9BA"
  },
  {
    name: 'Fountain Porter',
    place: 'Inside',
    activity: false,
    neighborhood: 'East Passyunk',
    happyHour: true,
   color: "#9DD992"
  },
  {
    name: 'Goldie',
    place: 'Inside',
    activity: false,
    neighborhood: 'Center City',
    happyHour: true,
   color: "#F4ED65"
  },
  {
    name: 'Graffiti Bar',
    place: 'Inside',
    activity: false,
    neighborhood: 'washington square west',
    happyHour: true,
     color: "#47AD52"
  },
  {
    name: 'Giorgios',
    place: 'Inside',
    activity: false,
    neighborhood: 'Bella Vista',
    happyHour: true,
     color: "#D64432"
  },
  {
    name: 'Harp and Crown',
    place: 'Inside',
    activity: false,
    neighborhood: 'Center City',
    happyHour: true,
     color: "#F0C76D"
  },
  {
    name: 'Hale and True',
    place: 'Inside',
    activity: false,
    neighborhood: 'Bella Vista',
    happyHour: true,
     color: "#FFB847"
  },
  {
    name: 'The Halal Guys',
    place: 'Outside',
    activity: false,
    neighborhood: 'University City',
    happyHour: true,
   color: "#BFBDBB"
  },
  {
    name: 'Happy Rooster',
    place: 'Inside',
    activity: false,
    neighborhood: 'Fishtown',
    happyHour: true,
   color: "#FAD7CE"
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
   color: "#F0FACE"
  },
  {
    name: 'Jaxx Beer Boutique',
    place: 'Inside',
    activity: false,
    neighborhood: 'Queen Village',
    happyHour: true,
     color: "#9F1F16"
  },
  {
    name: 'Johnny Brenda’s',
    place: 'Inside',
    activity: false,
    neighborhood: 'Fishtown',
    happyHour: true,
    color: "#F1E49C"
  },
  {
    name: 'Kalaya',
    place: 'Inside',
    activity: false,
    neighborhood: 'Fishtown',
    happyHour: true,
    color: "#EBA53A",
  },
  {
    name: 'Laser Wolf',
    place: 'Inside',
    activity: false,
    neighborhood: 'Fishtown',
    happyHour: true,
    color: "#DDA5F5",
  },
  {
    name: "The Love",
    place: "Inside",
    activity: false,
    neighborhood: "Center City",
    happyHour: true,
     color: "#0E5C9E"
  },
  {
    name: "Le Caveau",
    place: "Inside",
    activity: false,
    neighborhood: "Bella Vista",
    happyHour: true,
     color: "#DE9BAD"
  },
  {
    name: "Locust Rendezvous",
    place: "Inside",
    activity: false,
    neighborhood: "Washington Square West",
    happyHour: true,
     color: "#E41952"
  },
  {
    name: "Lazeez",
    place: "Inside",
    activity: false,
    neighborhood: "Bella Vista",
    happyHour: false,
     color: "#FEB43F"
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
    color: "#F4EBEB"
  },
  {
    name: "Parc",
    place: "Inside",
    activity: false,
    neighborhood: "Center City",
    happyHour: true,
    color: "#167623"
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
     color: "#F5F063"
  },
  {
    name: "Middle Child",
    place: "Inside",
    activity: false,
    neighborhood: "Fishtown",
    happyHour: true,
     color: "#115E1C"
  },
  {
    name: "Merkaz",
    place: "Inside",
    activity: false,
    neighborhood: "University City",
    happyHour: true,
     color: "#A02111"
  },
  {
    name: "Mission Taqueria",
    place: "Inside",
    activity: false,
    neighborhood: "Center City",
    happyHour: true,
     color: "#F4EBEB"
  },
  {
    name: "McGillan's",
    place: "Inside",
    activity: false,
    neighborhood: "washington square west",
    happyHour: true,
     color: "#AC918D"
  },
  {
    name: "Masala Kitchen",
    place: "Inside",
    activity: false,
    neighborhood: "Graduate Hospital",
    happyHour: true,
     color: "#F35A60"
  },
  {
    name: "Nunu",
    place: "Inside",
    activity: false,
    neighborhood: "washington square west",
    happyHour: true,
     color: "steelblue"
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
     color: "sandybrown"
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
    color: "cornflowerblue"
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
