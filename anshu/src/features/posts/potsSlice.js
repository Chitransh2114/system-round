import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const initialState = {
  posts: [],
  loading: true, // starts as true for the 5s startup display
  currentPage: 1,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    deletePost(state, action) {
      const postId = action.payload;
      state.posts = state.posts.filter((post) => post.id !== postId);
      
      // If we delete the last item on the current page, and the page is empty now, go back one page
      const totalPages = Math.ceil(state.posts.length / 6);
      if (state.currentPage > totalPages && totalPages > 0) {
        state.currentPage = totalPages;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { setLoading, setCurrentPage, deletePost } = postsSlice.actions;
export default postsSlice.reducer;
