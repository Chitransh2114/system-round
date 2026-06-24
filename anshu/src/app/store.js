import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/potsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});
