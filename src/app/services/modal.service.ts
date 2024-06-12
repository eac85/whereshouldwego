// modal.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TagItem } from '../types';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private isVisible = new Subject<boolean>();
  modalVisibilityChange = this.isVisible.asObservable();
  chips: string[] = [];

  showModal(chips: string[] = []) {
    this.chips = chips;
    this.isVisible.next(true);
  }

  hideModal() {
    this.isVisible.next(false);
  }

}
