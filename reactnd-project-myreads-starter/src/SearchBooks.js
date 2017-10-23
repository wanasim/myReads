import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

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
      if(bookQuery){
         BooksAPI.search(bookQuery.trim(), 20)
         .then((response)=>{
            if(!response || response.error){
                    this.setState({showingBooks: []})
                    console.log("no response from book api")
                } else {
                  //  this.bookShelf(response)
                    this.setState({showingBooks:response})
                }
            this.setState({showingBooks:response})
            console.log("showing", this.state.showingBooks)
         })
      }
      else{
         this.setState({showingBooks:[]})
      }
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
                <input type="text" placeholder="Search by title or author" onChange={(event)=>this.updateQuery(event.target.value)} value={bookQuery}/>

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
