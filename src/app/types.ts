export type TagItem = {
    display: string;
    value: string;
};

export type Item = {
    name: string;
    place: string;
    activity: boolean;
    neighborhood: string;
    happyHour: boolean;
    color: string;
    dogFriendly?: boolean;
    cuisine?: string;
  };

export type Place = {
    name: string;
    place: string;
    outdoor?: boolean | null;
    activity?: boolean | null;
    neighborhood: {
        id: number, 
        name: string;
    }
    happy_hour?: boolean;
    color: string;
    dog_friendly?: boolean | null;
    cuisine?: {
        id: number, 
        name: string;
    }
};

export type Cuisine = {
    name: string;
    id: number;
};

export type Neighborhood = {
    name: string;
    id: number;
}