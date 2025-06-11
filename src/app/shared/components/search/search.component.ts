import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Input() placeholder? = 'Input text';
  @Output() searchEvent = new EventEmitter<string>();

  searchText: string = '';

  searchCourse() {
    this.searchEvent.emit(this.searchText);
  }
}
