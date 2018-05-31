import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
// import {Debounce} from 'react-throttle';
import {DebounceInput} from 'react-debounce-input';

export default class SearchBooks extends Component{
   state= {
      showingBooks:[],
      bookQuery:''
   }

   propTypes = {
      books: PropTypes.array.isRequired,
      changeShelf: PropTypes.func.isRequired,
   }


   updateQuery = (bookQuery) => {
      this.setState({bookQuery})
      console.log("bookQuery", bookQuery)
      if(bookQuery){
         BooksAPI.search(bookQuery.trim(), 20)
         .then((response)=>{
            if(!response || response.error){
                    this.setState({showingBooks: []})
                    console.log("no response from book api")
             } else {
               //  calls on shelfExist function with  query response as paramater. function returns an updated array of newBooks with appropriate shelves
               this.setState({showingBooks:this.shelfExist(response)})
             }

            console.log("showing", this.state.showingBooks)
         })
      }
      else{
         this.setState({showingBooks:[]})
      }
   }

   shelfExist = (newBooks) => {
      newBooks = newBooks.map(book => {
         const found = this.props.books.find(b => b.id === book.id)
         if(found){
            book.shelf = found.shelf
         }else{
            book.shelf = 'none'
         }
         // return book to newBooks array with updated shelf
         return book
      })
      // return updated array of newBooks
      console.log("BOOOOK123", newBooks)
      return newBooks
   }

   render() {
      const {books, changeShelf} = this.props
      const {bookQuery, showingBooks} = this.state

      return (
         <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}


                //sets a timer after user is done typing 
               <DebounceInput debounceTimeout={300} type="text" placeholder="Search by title or author" onChange={(event)=>this.updateQuery(event.target.value)} value={bookQuery}/>


              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">



              {showingBooks.map((book)=>(
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:  `url(${book.imageLinks ? book.imageLinks.thumbnail : 'http://cdn.earthporm.com/wp-content/uploads/2015/10/XX-Proud-Mommies5__605.jpg'})`  }}></div>
                      <div className="book-shelf-changer">
                     <select value={book.shelf} onChange={(event) => changeShelf(book,event.target.value)}>
                          <option value="none" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{books.authors && book.authors.map((author)=>(

                          <div key={author} className="book-authors">{author}</div>

                    ))}</div>
                  </div>
                </li>

               ))}
              </ol>
            </div>
          </div>
      )
   }
}
