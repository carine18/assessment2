import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';
import { SearchCriteria, ErrorResponse, BooksResponse, BookResponse } from '../models';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  limit = 10;
  offset = 0;
  terms = '';

  books: BooksResponse = null;
  book: BookResponse = null;
  // next1: BooksResponse = null;
  // previous1: BooksResponse = null;

  constructor(private router: Router, private activatedRoute: ActivatedRoute
      , private bookSvc: BookService) { }

  ngOnInit() {
    const state = window.history.state;
    if (!state['terms'])
      return this.router.navigate(['/']);

    this.terms = state.terms;
    this.limit = state.limit || 10;

    const searchCriterial: SearchCriteria = {
      terms: this.terms,
      limit: this.limit
    }
    this.bookSvc.getBooks(searchCriterial)
      .then(result => {
        this.books = result;
        console.log(this.books)
      }).catch(error => {
        const errorResponse = error as ErrorResponse;
        alert(`Status: ${errorResponse.status}\nMessage: ${errorResponse.message}`)
      })
  }

  //  searchCriterial2: SearchCriteria = {
  //   terms: this.terms,
  //   limit: this.limit
  // }
  next() {
    //TODO - for Task 4
    // this.bookSvc.getBooks(this.searchCriterial2)
    // .then(result => {
    //   this.next1 = result;
    //   console.log(this.next1)
    // }).catch(error => {
    //   const errorResponse = error as ErrorResponse;
    //   alert(`Status: ${errorResponse.status}\nMessage: ${errorResponse.message}`)
    // })
  }

  previous() {
    //TODO - for Task 4
    // this.bookSvc.getBooks(this.searchCriterial2)
    // .then(result => {
    //   this.previous1 = result;
    //   console.log(this.previous1)
    // }).catch(error => {
    //   const errorResponse = error as ErrorResponse;
    //   alert(`Status: ${errorResponse.status}\nMessage: ${errorResponse.message}`)
    // })
  }

  bookDetails(book_id: string) {
    //TODO
    this.bookSvc.getBook(book_id)
    .then(result => {
      this.book = result;
      console.info('Book id: ', book_id);
      console.log(this.book.data.authors);
      console.log(this.book)
      this.router.navigate([ `/book/${book_id}` ]);
    }).catch(error => {
      const errorResponse = error as ErrorResponse;
      alert(`Status: ${errorResponse.status}\nMessage: ${errorResponse.message}`)
    })
    
  }

  back() {
    this.router.navigate(['/']);
  }

}


// export interface BooksResponse {
//   data: BookSummary[];
//   // The search term that resulted in this qurey
//   terms: string;
//   // Time stamp of this response (new Date()).getTime()
//   timestamp: number;
//   // Total number of results from this search
//   total: number;
//   // Number of results from total limit < total
//   limit: number;
//   // Number of records skipped from the top
//   offset: number;
// }
// export interface BookSummary {
//   book_id: string;
//   title: string;
//   authors: string[];
//   rating: number;
// }