import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  query = '';

  @Output() searchSubmitted = new EventEmitter<string>();

  searchForm() {
    this.searchSubmitted.emit(this.query.trim());
    this.query = '';
  }
}
