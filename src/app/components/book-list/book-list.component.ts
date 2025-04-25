import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { Router } from '@angular/router';
import { HighlightDirective } from '../../directives/highlight.directive';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, HighlightDirective, TruncatePipe],
  templateUrl: './book-list.component.html',
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  data: any[] = [];
  searchTerm: string = '';
  message: string='';

  constructor(
    private bookService: BookService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.loadBooks();
  }
  
  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (books: Book[]) => {
        this.books = books;
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement des livres:', err);
      }
    });
  }
  
  toggleFavorite(book: Book): void {
    this.bookService.toggleFavorite(book.id).subscribe({
      next: (updatedBook: Book) => {
        // TODO 16: Affiche une alerte qui indique que le favori a été modifié
        this.message = `Le statut de favori pour "${updatedBook.title}" a été mis à jour.`;
        this.loadBooks();
      },
      error: (err: any) => {
        // TODO 17: Affiche une alerte qui indique que la modification du favori a échoué
        this.message = `Erreur : impossible de modifier le favori pour "${book.title}".`;
        console.error('Erreur lors de la modification du favori:', err);
      }
    });
  }
  
  deleteBook(id: string): void {
    this.bookService.deleteBook(id).subscribe({
      next: () => {
        // TODO 18: Affiche une alerte qui indique que le livre a été supprimé
        this.message = 'Le livre a été supprimé avec succès.';
        this.loadBooks();
      },
      error: (err: any) => {
        // TODO 19: Affiche une alerte qui indique que la suppression du livre a échoué
        this.message = 'Erreur : impossible de supprimer ce livre.';
        console.error('Erreur lors de la suppression du livre:', err);
      }
    });
  } 

  goToBookDetails(id: string): void {
    this.router.navigate(['/books', id]);
  }
}
