# React Kanban Board

A customizable drag-and-drop Kanban board built with React and the dnd-kit library. This application allows users to create, edit, and organize tasks across multiple columns with a smooth, interactive interface.

<img src= "Kanban-board-video.gif">

## Features

- **Dynamic Columns**: Create, rename, and delete columns to customize your workflow
- **Task Management**: Add, edit, and delete tasks within each column
- **Drag and Drop Functionality**:
  - Reorder columns by dragging them horizontally
  - Move tasks between columns
  - Reorder tasks within columns
- **Intuitive UI/UX**:
  - Visual feedback during dragging operations
  - Edit task content with a simple click
  - Minimalist design with hover effects

## Technical Implementation

### Components Structure

The application is built with three main components:

1. **KanbanBoard.tsx**: The main container component that manages the state of columns and tasks, and handles the drag-and-drop logic.
2. **ColumnContainer.tsx**: Represents each column in the Kanban board, including its title, tasks, and action buttons.
3. **TaskCard.tsx**: Represents individual tasks that can be edited and moved between columns.

### Key Technologies

- **React**: Utilizes React's state management and component-based architecture
- **dnd-kit**: Implements smooth drag-and-drop functionality with:
  - `@dnd-kit/core`: Core dragging functionality
  - `@dnd-kit/sortable`: Sortable behavior for organized reordering
  - `@dnd-kit/utilities`: CSS utility functions for transformations

### State Management

The application manages several key states:

- Column state (array of columns with IDs and titles)
- Task state (array of tasks with IDs, content, and column associations)
- Active states for tracking dragging operations

### Drag and Drop Operations

The application supports three main drag and drop scenarios:

1. Reordering columns horizontally
2. Moving tasks between columns
3. Reordering tasks within a single column

Each operation uses specific event handlers (`onDragStart`, `onDragEnd`, `onDragOver`) to maintain data consistency and provide visual feedback.

## Usage

### Creating Columns

Click the "Add Column" button to create a new column. Each column is initialized with a default title that can be customized.

### Managing Columns

- **Rename**: Click on a column title to edit it
- **Delete**: Click the trash icon in the column header to remove the column and all its tasks
- **Reorder**: Drag and drop columns horizontally to change their order

### Managing Tasks

- **Create**: Click the "Add task" button at the bottom of a column
- **Edit**: Click on a task to edit its content
- **Delete**: Hover over a task and click the trash icon that appears
- **Move**: Drag tasks between columns or reorder them within a column

## Installation and Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/react-kanban-board.git
cd react-kanban-board
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Customization

The application uses a clean, dark theme by default, with CSS classes that can be customized to match your preferred styling. The main color classes include:

- `bg-mainBackgroundColor`: Main background color
- `bg-columnBackgroundColor`: Column background color
- Various hover and active states for interactive elements

## Future Enhancements

- Task filtering and searching
- Task categorization with labels or tags
- User authentication and data persistence
- Mobile responsiveness improvements
- Expanded task details with descriptions, due dates, and assignments

## License

This project is licensed under the MIT License --->  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Acknowledgments

This project uses the powerful [dnd-kit](https://dndkit.com/) library for its drag-and-drop functionality.
