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
      className="p-2 border cursor-pointer whitespace-nowrap text-white"
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
          <div className="py-2 relative">
            <label htmlFor="viewSelect" className="text-white block">
              Select View:
            </label>
            <div className="relative inline-block text-black">
              <select
                id="viewSelect"
                className="block appearance-none w-full bg-blue-500 border border-gray-300 text-white py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-400"
                value={view}
                onChange={(e) => switchViews(e.target.value)}
              >
                <option className="bg-blue-500" value="grid">
                  Grid
                </option>
                <option className="bg-blue-500" value="table">
                  Table
                </option>
                <option className="bg-blue-500" value="columns">
                  Columns
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <svg
                className="w-6 h-6 text-white fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                >
                  <path
                    d="M7.293 12.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414z"
                  />
                </svg>
              </div>
            </div>
          </div>
          {/* <div className="py-2">
              <label htmlFor="viewSelect" className="text-white">
                Select View:
              </label>
              <select
                id="viewSelect"
                className="bg-blue-500 text-white rounded-full px-4 py-2 ml-2 focus:outline-none focus:shadow-outline-blue"
                value={view}
                onChange={(e) => switchViews(e.target.value)}
              >
              <option className="text-black" value="grid">
                Grid
              </option>
              <option className="text-black" value="table">
                Table
              </option>
              <option className="text-black" value="columns">
                Columns
              </option>
            </select>
          </div> */}
        </>
      )}

      {view === "grid" && (
        <div className="grid gap-2 grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map((book) => (
            <BookCard key={book.id} data={book} view={view} listId={0} />
          ))}
        </div>
      )}
      {view === "columns" && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3  bg-slate-500 p-4">
          {data.map((book) => (
            <BookCard key={book.id} data={book} view={view} listId={0} />
          ))}
        </div>
      )}
      {view === "table" && (
        <div className="table-view overflow-x-auto w-full bg-slate-500">
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
