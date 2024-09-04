// modal.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TagItem } from '../types';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalVisibilitySource = new BehaviorSubject<{ isVisible: boolean, place: any }>({
    isVisible: false,
    place: null,
  });
  modalVisibilityChange = this.modalVisibilitySource.asObservable();

  private placeModalVisibilitySource = new BehaviorSubject<{ isPlaceVisible: boolean, place: any, position: { x: number, y: number } }>({
    isPlaceVisible: false,
    place: null,
    position: { x: 0, y: 0 }
  });
  placeModalVisibilityChange = this.placeModalVisibilitySource.asObservable();
  
  chips: string[] = [];
  place: any;

  showModal(place: any) {
    this.place = place;
    if(place == null){
      //place.name = null;
    }
    this.modalVisibilitySource.next({ isVisible: true, place: place });
  }

  hideModal() {
    this.modalVisibilitySource.next({ isVisible: false, place: null });
  }

  showPlaceModal(isPlaceVisible: boolean, place: any, position: { x: number, y: number }) {
    this.place = place;
    this.placeModalVisibilitySource.next({ isPlaceVisible, place, position });
  }

  hidePlaceModal() {
    this.placeModalVisibilitySource.next({ isPlaceVisible: false, place: null, position:  {x: 0, y:0} });
  }

}
