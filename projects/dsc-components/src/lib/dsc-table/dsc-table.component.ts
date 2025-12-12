import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ContentChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DscTableColumn {
  field: string;
  header: string;
  sortable?: boolean;
  width?: string;
}

export type SelectorType = 'checkbox' | 'radio' | 'none';

@Component({
  selector: 'dsc-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dsc-table.component.html',
  styleUrls: ['./dsc-table.component.scss'],
})
export class DscTableComponent {
  @Input() columns: DscTableColumn[] = [];
  @Input() data: any[] = [];
  @Input() tableMaxHeight: string = '';
  @Input() tableRowHeight: string = '';
  @Input() selectorType: SelectorType = 'none';
  @Input() expandable: boolean = false;
  @Input() selectedItems: any[] = [];
  @Input() paginator: boolean = false;
  @Input() paginatorPageIndex: number = 0;
  @Input() paginatorPageSize: number = 10;
  @Input() hidePaginatorRangeLabel: boolean = false;
  @Input() disabledPaginator: boolean = false;
  @Input() expandedDetailTemplate?: TemplateRef<any>;

  @Output() selectionChange = new EventEmitter<any[]>();
  @Output() rowExpanded = new EventEmitter<any>();
  @Output() sortChange = new EventEmitter<{
    column: string;
    direction: 'asc' | 'desc';
  }>();

  @ContentChild('expandedDetail') expandedDetailRef?: TemplateRef<any>;

  expandedRows: Set<any> = new Set();
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' | '' = '';

  get displayedData(): any[] {
    if (!this.paginator) {
      return this.data;
    }

    const startIndex = this.paginatorPageIndex * this.paginatorPageSize;
    const endIndex = startIndex + this.paginatorPageSize;
    return this.data.slice(startIndex, endIndex);
  }

  isSelected(item: any): boolean {
    return this.selectedItems.includes(item);
  }

  isAllSelected(): boolean {
    return (
      this.displayedData.length > 0 &&
      this.displayedData.every((item) => this.isSelected(item))
    );
  }

  toggleSelectAll(): void {
    if (this.isAllSelected()) {
      // Deselect all displayed items
      this.selectedItems = this.selectedItems.filter(
        (item) => !this.displayedData.includes(item)
      );
    } else {
      // Select all displayed items
      const newSelections = this.displayedData.filter(
        (item) => !this.isSelected(item)
      );
      this.selectedItems = [...this.selectedItems, ...newSelections];
    }
    this.selectionChange.emit(this.selectedItems);
  }

  toggleSelection(item: any): void {
    if (this.selectorType === 'radio') {
      this.selectedItems = [item];
    } else if (this.selectorType === 'checkbox') {
      const index = this.selectedItems.indexOf(item);
      if (index > -1) {
        this.selectedItems = this.selectedItems.filter((i) => i !== item);
      } else {
        this.selectedItems = [...this.selectedItems, item];
      }
    }
    this.selectionChange.emit(this.selectedItems);
  }

  isExpanded(row: any): boolean {
    return this.expandedRows.has(row);
  }

  toggleRowExpansion(row: any): void {
    if (this.expandedRows.has(row)) {
      this.expandedRows.delete(row);
    } else {
      this.expandedRows.add(row);
      this.rowExpanded.emit(row);
    }
  }

  sortByColumn(column: DscTableColumn): void {
    if (!column.sortable) return;

    if (this.sortColumn === column.field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column.field;
      this.sortDirection = 'asc';
    }

    this.sortChange.emit({
      column: this.sortColumn,
      direction: this.sortDirection,
    });
  }

  getCellValue(row: any, field: string): any {
    return field.split('.').reduce((obj, key) => obj?.[key], row);
  }
}
