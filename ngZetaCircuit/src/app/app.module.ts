import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RunService } from './services/run.service';
import { UserService } from './services/user.service';
import { UserListComponent } from './components/user-list/user-list.component';
import { RunListComponent } from './components/run-list/run-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    RunListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    UserService,
    RunService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
