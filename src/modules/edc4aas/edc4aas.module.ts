import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { OwnSelfDescriptionBrowserComponent } from './components/own-self-description-browser/own-self-description-browser.component';
import { OwnElementCollectionTemplate } from './components/own-self-description-browser/template/own-element-collection-template/own-element-collection-template.component';
import { ElementCollectionTemplate } from './components/self-description-browser/template/element-collection-template/element-collection-template.component';
import { InfoViewTemplate } from './components/template/info-view-template/info-view-template.component';
import { SelfDescriptionBrowserComponent } from './components/self-description-browser/self-description-browser.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatGridListModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatProgressBarModule,
    MatListModule,
  ],
  declarations: [
    SelfDescriptionBrowserComponent,
    ElementCollectionTemplate,
    OwnSelfDescriptionBrowserComponent,
    OwnElementCollectionTemplate,
    InfoViewTemplate
  ],
  exports: [
    SelfDescriptionBrowserComponent,
    ElementCollectionTemplate,
    OwnSelfDescriptionBrowserComponent,
    OwnElementCollectionTemplate,
    InfoViewTemplate
  ]
})
export class Edc4AasModule {
}
