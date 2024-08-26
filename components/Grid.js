"use client";

import { useState } from 'react';
import useStore from '../lib/store';

const Grid = () => {
  const { cells, updateCell, undo, redo, history, undoStack } = useStore(); // Updated `future` to `undoStack`
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const cellsPerPage = 100;

  // Filtered cells based on search term
  const filteredCells = cells
    .map((cell, index) => ({ cell, index }))
    .filter(({ cell }) => cell.includes(searchTerm));

  // Paginated cells
  const paginatedCells = filteredCells.slice(
    (currentPage - 1) * cellsPerPage,
    currentPage * cellsPerPage
  );

  const handleCellChange = (index, event) => {
    const value = event.target.value;
    // Example validation: only numeric values allowed
    if (/^\d*$/.test(index,value)) {
      updateCell(index, value);
    }
  };

  return (
    <div>
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border"
      />

      {/* Grid rendering */}
      <div className="grid grid-cols-10 gap-1 p-4">
        {paginatedCells.map(({ cell, index }) => (
          <input
            key={index}
            type="text"
            value={cell}
            onChange={(e) => handleCellChange(index, e)}
            className="border p-2 text-black"
            placeholder="Type here"
          />
        ))}
      </div>

      {/* Pagination controls */}
      <div className="mt-4">
        <button
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          className="mr-2 px-4 py-2 border"
        >
          Previous Page
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 border"
        >
          Next Page
        </button>
      </div>

      {/* Undo/Redo buttons */}
      <div className="mt-4">
        <button
          onClick={undo}
          disabled={history.length === 0}
          className="mr-2 px-4 py-2 border"
        >
          Undo
        </button>
        <button
          onClick={redo}
          disabled={undoStack.length === 0} // Updated from `future` to `undoStack`
          className="px-4 py-2 border"
        >
          Redo
        </button>
      </div>
    </div>
  );
};

export default Grid;
