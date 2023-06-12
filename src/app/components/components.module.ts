import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [SearchComponent, ResultComponent],
  imports: [CommonModule],
  exports: [SearchComponent],
})
export class ComponentsModule {}
