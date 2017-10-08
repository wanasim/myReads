import React, {Component} from 'react'
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
// import escapeRegExp from 'escape-string-regexp'
// import sortBy from 'sort-by'
import BookShelf from './BookShelf'
import {Link} from 'react-router-dom'

class BookList extends Component{
   static propTypes = {
      books:PropTypes.array.isRequired,
      shelf:PropTypes.string,
      changeShelf:PropTypes.func.isRequired
   }
   render(){
      const {books, shelf, changeShelf} = this.props;
      console.log("books", books)


      return(
         <div>
            <div className="list-books">
                  <div className="list-books-title">
                     <h1>MyReads</h1>
                  </div>
                  <div className="list-books-content">
                     <BookShelf changeShelf={changeShelf} shelf="Currently Reading" books={books.filter((book)=>(book.shelf === 'currentlyReading'))}/>

                     <BookShelf changeShelf={changeShelf} shelf="Want To Read" books={books.filter((book)=>(book.shelf === 'wantToRead'))}/>

                     <BookShelf changeShelf={changeShelf} shelf="Read" books={books.filter((book)=>(book.shelf === 'read'))}/>
                  </div>
            </div>
            <div className="open-search">
               <Link to="/search">Add a book</Link>
            </div>
         </div>

      )

   }
}

export default BookList
