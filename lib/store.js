import create from 'zustand';

// Create a Zustand store
const useStore = create((set) => ({
  cells: Array(1000).fill(''), // Initialize cells
  history: [], // Initialize history
  undoStack: [], // Initialize undo stack

  // Method to update a cell and manage history
  updateCell: (index, value) =>
    set((state) => {
      // Save the current state to history before updating
      const newHistory = [...state.history, state.cells];
      const newCells = [...state.cells];
      newCells[index] = value;

      return {
        cells: newCells,
        history: newHistory, // Update history
        undoStack: [], // Clear the redo stack on new update
      };
    }),

  // Method to undo the last action
  undo: () =>
    set((state) => {
      // Check if there is any history to undo
      if (state.history.length === 0) return state;

      // Pop the last history state
      const newHistory = [...state.history];
      const lastState = newHistory.pop();
      return {
        cells: lastState,
        history: newHistory,
        undoStack: [state.cells, ...state.undoStack], // Save current state to redo stack
      };
    }),

  // Method to redo the last undone action
  redo: () =>
    set((state) => {
      // Check if there is any state to redo
      if (state.undoStack.length === 0) return state;

      // Pop the last undone state
      const newUndoStack = [...state.undoStack];
      const redoState = newUndoStack.shift();
      return {
        cells: redoState,
        history: [...state.history, state.cells], // Save current state to history
        undoStack: newUndoStack,
      };
    }),
}));

export default useStore;
