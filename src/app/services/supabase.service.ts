import { createClient, SupabaseClient, PostgrestResponse } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cuisine, Neighborhood } from '../types';

@Injectable({
    providedIn: 'root'
})

export class SupabaseService {
    private supabase: SupabaseClient
  
    constructor() {
      this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
    }

    async getPlaces(){
        let { data: place, error } = await this.supabase
        .from('place')
        .select(`outdoor_seating,activity,happy_hour,color,cuisine (id, name),dog_friendly,name,
        neighborhood (id, name)
        `).eq('status', 'A');
        return {data:place, error};
      }

      
      getPlaces1(): Observable<any> {
        return new Observable(observer => {
          this.supabase
            .from('place')
            .select(`
            outdoor_seating,
            activity,
            happy_hour,
            color,
            cuisine (id, name),
            dog_friendly,
            name, 
            neighborhood (id, name) 
           `).eq('status', 'A')
            .then((response: PostgrestResponse<any>) => {
              if (response.error) {
                observer.error(response.error.message);
              } else {
                observer.next(response.data);
              }
              observer.complete();
            })
        });
      }

    async savePlace(restaurant: any){
        restaurant.status = 'P';
        const { data, error } = await this.supabase.from('place').insert([restaurant]);
        if (error) {
            throw error;
          }
          return data;
    }

    async getNeighborhoods(): Promise<Neighborhood[]>{
        let {data, error } = await this.supabase
        .from('neighborhood')
        .select(`id, name`);
        if (error) {
            console.error('Error fetching neighborhoods:', error);
            return [];
        }
        return data as Neighborhood[];
    }
    async getCuisine(): Promise<Cuisine[]>{
        let { data, error } = await this.supabase
        .from('cuisine')
        .select(`id, name`);
        if (error) {
            console.error('Error fetching cuisine:', error);
            return [];
        }
        return data as Cuisine[];
    }
}