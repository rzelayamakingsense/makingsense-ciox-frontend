import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SortDirectionEnum } from '@shared/enums/enums';

@Component({
  selector: 'app-sort-link',
  templateUrl: './sort-link.component.html',
  styleUrls: ['./sort-link.component.scss']
})
export class SortLinkComponent implements OnInit {

  @Input()
  columnName: string = "";

  @Input()
  currentSortBy: string = "";

  @Input()
  sortBy: string = "";

  @Input()
  sortDirection: SortDirectionEnum = SortDirectionEnum.ASC;

  @Output()
  event: EventEmitter<any> = new EventEmitter();

  touched: boolean = false;

  ngOnInit(): void {

  }

  onSort() {

    this.sortDirection = this.sortDirection == SortDirectionEnum.ASC ? SortDirectionEnum.DESC : SortDirectionEnum.ASC;

    this.event.emit({
      sortBy: this.sortBy,
      sortDirection: this.sortDirection
    })

    this.touched = true;

  }

  get isAscending() {
    return this.sortDirection == 1 && (this.sortBy == this.currentSortBy);
  }

  get isDescending() {
    return this.sortDirection == 2 && (this.sortBy == this.currentSortBy);
  }

  constructor() { }

}



