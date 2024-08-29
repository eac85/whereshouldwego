// modal.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TagItem } from '../types';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private isVisible = new Subject<boolean>();
  modalVisibilityChange = this.isVisible.asObservable();
  //placeModalVisibilityChange = this.isPlaceVisible.asObservable();

  //private placeModalVisibilitySource = new BehaviorSubject<{ isPlaceVisible: boolean, place: any }>({ isPlaceVisible: false, place: null, position: { x: number, y: number } });
  private placeModalVisibilitySource = new BehaviorSubject<{ isPlaceVisible: boolean, place: any, position: { x: number, y: number } }>({
    isPlaceVisible: false,
    place: null,
    position: { x: 0, y: 0 }
  });
  placeModalVisibilityChange = this.placeModalVisibilitySource.asObservable();
  
  chips: string[] = [];
  place: any;

  showModal(chips: string[] = []) {
    this.chips = chips;
    this.isVisible.next(true);
  }

  hideModal() {
    this.isVisible.next(false);
  }

  showPlaceModal(isPlaceVisible: boolean, place: any, position: { x: number, y: number }) {
    this.place = place;
    this.placeModalVisibilitySource.next({ isPlaceVisible, place, position });
  }

  hidePlaceModal() {
    this.placeModalVisibilitySource.next({ isPlaceVisible: false, place: null, position:  {x: 0, y:0} });
  }

}
