import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

// Create task
export const createTask = createAsyncThunk(
  'tasks/createTask',
  async ({ title, description, dueDate, status, priority }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/task', {
        title,
        description,
        dueDate,
        status,
        priority
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Something went wrong' });
    }
  }
);

// Get all tasks
export const getAllTasks = createAsyncThunk('tasks/getAllTasks', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/task');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'Something went wrong' });
  }
});

// Get single task
export const getTaskById = createAsyncThunk('tasks/getTaskById', async ({ id }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/task/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'Something went wrong' });
  }
});

// Update task
export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ taskId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/task/${taskId}`, updatedData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Something went wrong' });
    }
  }
);


// Delete task
export const deleteTask = createAsyncThunk('tasks/deleteTask', async ({ id }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`/task/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'Something went wrong' });
  }
});

// Initial States
const initialState = {
  tasks: [],
  task: null,
  loading: false,
  error: null,
  success: false,
};

// Slice
const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.tasks.push(action.payload.task); 
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Get all tasks
      .addCase(getAllTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.tasks; 
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Get single task
      .addCase(getTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.task = null;
      })
      .addCase(getTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload.task;
      })
      .addCase(getTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Update task
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.tasks.findIndex(task => task._id === action.payload.task._id);
        if (index !== -1) {
          state.tasks[index] = action.payload.task;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Delete task
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.tasks = state.tasks.filter(task => task._id !== action.payload.taskId);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export default taskSlice.reducer;
