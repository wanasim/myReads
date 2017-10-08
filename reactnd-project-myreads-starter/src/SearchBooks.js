import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

class SearchBooks extends Component{
   static PropTypes = {
      books: PropTypes.array.isRequired,
      changeShelf: PropTypes.func.isRequired,
   }

   state= {
      query:''
   }

   updateQuery = (event) => {
      this.setState({
         query: event.target.value.trim()
      })
   }


   render() {
      const {books, changeShelf} = this.props
      const {query} = this.state
      let showingBooks

      if(query){
         BooksAPI.search(query, 20)
         .then(function(response){
            console.log(response)
         })
      }
      else{
         showingBooks = books
      }

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
                <input type="text" placeholder="Search by title or author" value={query} onChange={(event)=>this.updateQuery(event)}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {books.map((book)=>(
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                      <div className="book-shelf-changer">
                        <select value={book.shelf} onChange={(event) => changeShelf(book,event.target.value)}>
                          <option value="none" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors.map((author)=>(

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

export default SearchBooks
