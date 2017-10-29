import React from 'react'
import BookInfo from './BookInfo'


function BookShelf(props) {
      // console.log("bookshelf props", props)
      return(
         <div className="bookshelf">
                  <h2 className="bookshelf-title">{props.shelf}</h2>
                  <div className="bookshelf-books">

                       <ol className="books-grid">
                       {props.books.map((book)=>(
                         <li key={book.id}>
                           <BookInfo book = {book} changeShelf = {props.changeShelf}/>

                         </li>

                        ))}
                     </ol>
                  </div>
                </div>
      )
}
export default BookShelf
