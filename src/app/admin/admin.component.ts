import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { Observable, of, map } from 'rxjs';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent {

  pendingPlaces$: Observable<any>;
  placesLength: number = 0;
  
  pendingEdits$: Observable<any>;

  constructor(private readonly supabase: SupabaseService, private router: RouterModule ) {
    this.pendingPlaces$ =  this.supabase.getPendingPlaces();
    this.pendingEdits$ = this.supabase.getPendingEdits();
    
    console.log(this.pendingEdits$);
    this.pendingPlaces$.pipe(
      map(places => places.length)
    ).subscribe(length => {
      this.placesLength = length;
    });
  }

  savePlace(id: any){
    console.log("activating place " + id);
    this.supabase.updatePlaceStatus(id, 'A');
  }

  deletePlace(id: any){
    console.log("inactivating place " + id );
    this.supabase.updatePlaceStatus(id, 'I');
  }

}
