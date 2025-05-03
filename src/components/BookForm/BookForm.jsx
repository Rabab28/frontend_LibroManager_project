import React from "react";

function BookForm(props){
    return (
        <div>
            <h3>{props.titleVerb} The Book:</h3>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <label htmlFor="book_title">The Title:</label>
                    <input 
                        id="book_title"
                        name="book_title"
                        required
                        value={props.book_title}
                        onChange={(event => props.setBookTitle(event.target.value))}
                    />
                </div>
                <div>
                    <label htmlFor="book_author">The Author:</label>
                    <input 
                        id="book_author"
                        name="book_author"
                        required
                        value={props.book_author}
                        onChange={(event => props.setBookAuther(event.target.value))}
                    />
                </div>
                <div>
                    <label htmlFor="book_year">Publish Year:</label>
                    <input 
                        id="book_year"
                        name="book_year"
                        required
                        value={props.book_year}
                        onChange={(event => props.setBookYear(event.target.value))}
                    />
                </div>
                <div>
                    <label htmlFor="book_no_of_pages">Number of pages:</label>
                    <input 
                        id="book_no_of_pages"
                        name="book_no_of_pages"
                        required
                        value={props.book_no_of_pages}
                        onChange={(event => props.setBookNoOfPages(event.target.value))}
                    />
                </div>
                <div>
                    <label htmlFor="book_language">Book Language:</label>
                    <input 
                        id="book_language"
                        name="book_language"
                        required
                        value={props.book_language}
                        onChange={(event => props.setBookLanguage(event.target.value))}
                    />
                </div>
                <div>
                    <label htmlFor="book_brief">Brief:</label>
                    <input 
                        id="book_brief"
                        name="book_brief"
                        required
                        value={props.book_brief}
                        onChange={(event => props.setBookBrief(event.target.value))}
                    />
                </div>
                <div>
                    <label htmlFor="book_pic_url">Book cover:</label>
                    <input 
                        id="book_pic_url"
                        name="book_pic_url"
                        required
                        value={props.book_pic_url}
                        onChange={(event => props.setBookPicUrl(event.target.value))}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>    
    )
}

export default BookForm
