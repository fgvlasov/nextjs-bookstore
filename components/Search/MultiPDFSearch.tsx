import React, { useState } from "react";

//interface MultiPDFSearchProps {
  //books: [];
//}

interface IBook {
  title: string
  author: string
  description: string
  ISBN: number
  year: number
}


export interface BookList {
  books: IBook[]

}


const MultiPDFSearch: React.FC<BookList> = (books) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [foundBooks, setFoundBooks] = useState<IBook[]>([]);

  const handleSearch = () => {
    // Perform your search logic here and find all matching book titles
    // For simplicity, I'm using a placeholder value based on the search term

    const matchingBooks:IBook[] = books.books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
      || book.author.toLowerCase().includes(searchTerm.toLowerCase())
      || book.description.toLowerCase().includes(searchTerm.toLowerCase())
      || book.ISBN.toString().includes(searchTerm.trim())
      || book.year.toString().includes(searchTerm.trim())
    );

    //const uniqueBooks = [...new Map(matchingBooks.map(item =>[item['title'], item])).values()];
    // var names:string[] = matchingBooks.map(function(item) {
    //return item.title;
    //});

    //const aaa = matchingBooks.map(item => item.title);

    setFoundBooks(matchingBooks);
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-white">
        Book Search
      </h1>

      <div>
        <input
          type="text"
          placeholder="Enter book title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white rounded-full px-4 py-2 ml-2 focus:outline-none focus:shadow-outline-blue"
        >
          Search
        </button>
      </div>
      <div className="py-2 text-white">
        {foundBooks.length > 0 ? (
          <div>
            <p>Matching Books:</p>
            <ul>
              {foundBooks.map((book, index) => (
                <li key={index}>{book.title}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No matching books found</p>
        )}
      </div>
    </div>
  );
};

export default MultiPDFSearch;
