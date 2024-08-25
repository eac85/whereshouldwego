import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent {

  pendingPlaces$: Observable<any>;

  constructor(private readonly supabase: SupabaseService, private router: RouterModule ) {
    this.pendingPlaces$ =  this.supabase.getPendingPlaces();
  }

  savePlace(id: any){
    console.log("activating place " + id);
    this.supabase.updatePlace(id, 'A');
  }

  deletePlace(id: any){
    console.log("inactivating place " + id );
    this.supabase.updatePlace(id, 'I');
  }

}
