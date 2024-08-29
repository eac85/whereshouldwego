import { Component, Input } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-place-modal',
  templateUrl: './place-modal.component.html',
  styleUrls: ['./place-modal.component.css']
})
export class PlaceModalComponent {
  @Input() isPlaceVisible: any;
  @Input() place: any;
  @Input() position: any;

    constructor(private modalService: ModalService, private readonly supabase: SupabaseService) {
      this.modalService.placeModalVisibilityChange.subscribe(({ isPlaceVisible, place, position }) => {
        this.isPlaceVisible = isPlaceVisible;
        this.place = place;
        this.position = position;
      });
    }
  
  openModal(place: any) {
       this.closeModal();
       this.modalService.showModal(place);
  }

  closeModal() {
    this.modalService.hidePlaceModal();
  }
}
