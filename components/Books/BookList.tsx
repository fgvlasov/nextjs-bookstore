import React, { useState } from "react";

import { BookInterface } from "@/types";
import BookCard from "@/components/Books/BookCard";
import { isEmpty } from "lodash";

interface BookListProps {
  data: BookInterface[];
  title: string;
  type: string;
}

const BookList: React.FC<BookListProps> = ({ data, title, type }) => {
  const [view, setView] = useState<"grid" | "table" | "columns">("grid");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortField, setSortField] = useState<keyof BookInterface | null>(null);

  if (isEmpty(data)) {
    return null;
  }

  const switchViews = (selectedView: string): void => {
    setView(selectedView as "grid" | "table" | "columns");
  };

  const handleSort = (field: keyof BookInterface) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const fieldA = a[sortField!];
    const fieldB = b[sortField!];

    const comparison =
      (fieldA &&
        fieldB &&
        fieldA.toString().localeCompare(fieldB.toString())) ||
      0;

    return sortOrder === "asc" ? comparison : -comparison;
  });

  const SortableHeader: React.FC<{
    label: string;
    field: keyof BookInterface;
  }> = ({ label, field }) => (
    <th
      className="p-2 border cursor-pointer whitespace-nowrap"
      onClick={() => handleSort(field)}
    >
      {label}{" "}
      {sortField === field ? (
        <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
      ) : (
        <span>↕</span>
      )}
    </th>
  );

  return (
    <div className="mt-4 space-y-8">
      <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
        {title}
      </p>
      {type != "fav" && (
        <>
          <div className="py-2">
            <label htmlFor="viewSelect" className="text-white">
              Select View:
            </label>
            <select
              id="viewSelect"
              className="bg-blue-500 text-white rounded-full px-4 py-2 ml-2 focus:outline-none focus:shadow-outline-blue"
              value={view}
              onChange={(e) => switchViews(e.target.value)}
            >
              <option value="grid">Grid</option>
              <option value="table">Table</option>
              <option value="columns">Columns</option>
            </select>
          </div>
        </>
      )}

      {view === "grid" && (
        <div className="grid gap-2 grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map((book) => (
            <BookCard key={book.id} data={book} view={view} listId={0}/>
          ))}
        </div>
      )}
      {view === "columns" && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.map((book) => (
            <BookCard key={book.id} data={book} view={view} listId={0}/>
          ))}
        </div>
      )}
      {view === "table" && (
        <div className="table-view overflow-x-auto w-full">
          <table className="min-w-full table-auto min-w-[450px] border border-gray-300">
            <thead>
              <tr>
                <SortableHeader label="ID" field="id" />
                <SortableHeader label="Title" field="title" />
                <SortableHeader label="Author" field="author" />
                <SortableHeader label="Year" field="year" />
              </tr>
            </thead>
            <tbody>
              {sortedData.map((book, listId) => (
                <BookCard
                  key={book.id}
                  data={book}
                  view={view}
                  listId={listId}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookList;
