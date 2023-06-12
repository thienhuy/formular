import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { ResultComponent } from './result/result.component';
import { ResultValueComponent } from './result-value/result-value.component';

@NgModule({
  declarations: [SearchComponent, ResultComponent, ResultValueComponent],
  imports: [CommonModule],
  exports: [SearchComponent],
})
export class ComponentsModule {}
