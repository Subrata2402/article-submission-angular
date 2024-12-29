import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { JournalService } from '../shared/services/journal.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'description', 'createdAt'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private journalService: JournalService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.journalService.getJournalList().subscribe((response: any) => {
      if (response.success) {
        this.dataSource.data = response.data;
        this.dataSource.paginator = this.paginator;
      } else {
        this.snackBar.open('Error fetching journal list', 'Okay', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}