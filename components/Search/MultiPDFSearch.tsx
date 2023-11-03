import React, { useState } from "react";

interface MultiPDFSearchProps {
  pdfUrls: string[];
}

const MultiPDFSearch: React.FC<MultiPDFSearchProps> = ({ pdfUrls }) => {

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = () => {
    // Perform your search logic here and find all matching book titles
    // For simplicity, I'm using a placeholder value based on the search term

    const matchingBooks = pdfUrls.filter((pdfUrl) =>
      pdfUrl.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                <li key={index}>{book}</li>
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
