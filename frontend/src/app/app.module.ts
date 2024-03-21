import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule,HttpClient, HttpHeaders } from '@angular/common/http';
import { ClickOutsideModule } from 'ng-click-outside';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';
import { PagenofoundComponent } from './pagenofound/pagenofound.component';
import { ArtistComponent } from './artist/artist.component';
import { FooterbarComponent } from './footerbar/footerbar.component';
import { HeaderComponent } from './header/header.component';

import { NgxMasonryModule } from 'ngx-masonry';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './signup/signup.component';
import { CartService } from './cart.service';
import { ManageProductComponent } from './manage-product/manage-product.component';

const appRoutes: Routes = [
  { path: 'users', component: UserComponent },
  { path: 'products/:product_code', component: ProductComponent },
  { path: 'home', component: HomeComponent },
  { path: 'artist', component: ArtistComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'product/create', component: ManageProductComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PagenofoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    ProductComponent,
    PagenofoundComponent,
    ArtistComponent,
    FooterbarComponent,
    HeaderComponent,
    SignupComponent,
    ManageProductComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxMasonryModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ClickOutsideModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only set true
    )
  ],
  providers: [CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
