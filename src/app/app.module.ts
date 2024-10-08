import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TagInputModule } from 'ngx-chips';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppComponent } from './app.component';
import { MatChipsModule } from '@angular/material/chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ModalComponent } from './modal/modal.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { PlaceModalComponent } from './place-modal/place-modal.component';
import { EmailFormComponent } from './email-form/email-form.component'; 
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    AdminComponent,
    HomeComponent,
    PlaceModalComponent,
    EmailFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TagInputModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatChipsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
