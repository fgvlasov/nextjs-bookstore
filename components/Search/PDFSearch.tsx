import React, { useState } from "react";
import PDFSearch from "./PDFSearch";
import pdfjs from "pdfjs-dist";
import { BookList } from "./MultiPDFSearch";

interface MultiPDFSearchProps {
  pdfUrls?: string[]; // Add "?" to make it optional
}

const MultiPDFSearch: React.FC<BookList> = (books) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<
    Map<string, boolean | null>
  >(new Map());
  
  const handleSearch = (pdfUrl: string) => {
    const updatedResults = new Map(searchResults);

    if (!updatedResults.has(pdfUrl)) {
      updatedResults.set(pdfUrl, null);

      // Perform your search logic here and update the result accordingly
      // For simplicity, I'm using a placeholder value based on the search term
      const result = pdfUrl.toLowerCase().includes(searchTerm.toLowerCase());

      updatedResults.set(pdfUrl, result);
      setSearchResults(new Map(updatedResults));
    }
  };
  
  return (
    <div>
      <h1>Multi-PDF Search</h1>
      <div>
        <input
          type="text"
          placeholder="Enter search term"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => books.books.forEach((book) => handleSearch(book.title))}
        >
          Search in All PDFs
        </button>
      </div>
      <div>
        {books.books.map((pdfUrl) => (
          <div key={pdfUrl.title}>
            <button onClick={() => handleSearch(pdfUrl.title)}>
              Search in {pdfUrl.title}
            </button>
            <div id={pdfUrl.title}>
              {/* Conditionally render the PDFSearch component based on search result */}
              {/*earchResults.get(pdfUrl.title) !== null && (
                <PDFSearch BookList={pdfUrl.} />
              )*/}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiPDFSearch;
