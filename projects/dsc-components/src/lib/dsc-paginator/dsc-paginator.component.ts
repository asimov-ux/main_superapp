import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface PageEvent {
  pageIndex: number;
  pageSize: number;
  length: number;
}

@Component({
  selector: 'dsc-paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dsc-paginator.component.html',
  styleUrls: ['./dsc-paginator.component.scss'],
})
export class DscPaginatorComponent {
  @Input() length: number = 100;
  @Input() pageSize: number = 10;
  @Input() pageIndex: number = 0;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 100];
  @Input() hidePaginatorRangeLabel: boolean = false;
  @Input() disabledPaginator: boolean = false;

  @Output() page = new EventEmitter<PageEvent>();

  get totalPages(): number {
    return Math.ceil(this.length / this.pageSize);
  }

  get rangeLabel(): string {
    const startIndex = this.pageIndex * this.pageSize + 1;
    const endIndex = Math.min(
      (this.pageIndex + 1) * this.pageSize,
      this.length
    );
    return `${startIndex} - ${endIndex} de ${this.length}`;
  }

  get canGoFirst(): boolean {
    return this.pageIndex > 0 && !this.disabledPaginator;
  }

  get canGoPrevious(): boolean {
    return this.pageIndex > 0 && !this.disabledPaginator;
  }

  get canGoNext(): boolean {
    return this.pageIndex < this.totalPages - 1 && !this.disabledPaginator;
  }

  get canGoLast(): boolean {
    return this.pageIndex < this.totalPages - 1 && !this.disabledPaginator;
  }

  goToFirstPage(): void {
    if (this.canGoFirst) {
      this.changePage(0);
    }
  }

  goToPreviousPage(): void {
    if (this.canGoPrevious) {
      this.changePage(this.pageIndex - 1);
    }
  }

  goToNextPage(): void {
    if (this.canGoNext) {
      this.changePage(this.pageIndex + 1);
    }
  }

  goToLastPage(): void {
    if (this.canGoLast) {
      this.changePage(this.totalPages - 1);
    }
  }

  changePageSize(newSize: number): void {
    this.pageSize = newSize;
    this.pageIndex = 0; // Reset to first page
    this.emitPageEvent();
  }

  private changePage(newIndex: number): void {
    this.pageIndex = newIndex;
    this.emitPageEvent();
  }

  private emitPageEvent(): void {
    this.page.emit({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: this.length,
    });
  }
}
