import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { TaskState, Task } from '../../types';

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    toggleImportant: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.important = !task.important;
      }
    },
    updateTaskDueDate: (state, action: PayloadAction<{ id: string; dueDate: string }>) => {
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) {
        task.dueDate = action.payload.dueDate;
      }
    },
    updateTaskPriority: (state, action: PayloadAction<{ id: string; priority: Task['priority'] }>) => {
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) {
        task.priority = action.payload.priority;
      }
    },
    setWeatherData: (state, action: PayloadAction<{ id: string; weather: Task['weather'] }>) => {
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) {
        task.weather = action.payload.weather;
      }
    },
  },
});

export const {
  addTask,
  removeTask,
  toggleTask,
  toggleImportant,
  updateTaskDueDate,
  updateTaskPriority,
  setWeatherData
} = taskSlice.actions;

export default taskSlice.reducer;