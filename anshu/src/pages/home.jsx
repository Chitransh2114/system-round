import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, setLoading } from '../features/posts/potsSlice';
import PostsList from '../features/posts/PostsList';
import Loading from '../features/posts/Loading';

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    // Start fetching posts on startup
    dispatch(fetchPosts());

    // Display Loading for exactly 5 seconds
    const timer = setTimeout(() => {
      dispatch(setLoading(false));
    }, 5000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="home-container">
      {error ? (
        <div className="error-container">
          <p className="error-message">⚠️ Error: {error}</p>
          <button 
            className="retry-btn" 
            onClick={() => {
              dispatch(fetchPosts());
              dispatch(setLoading(true));
              setTimeout(() => dispatch(setLoading(false)), 5000);
            }}
          >
            Retry Fetch
          </button>
        </div>
      ) : (
        <PostsList />
      )}
    </main>
  );
};

export default Home;
