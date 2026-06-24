import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost, setCurrentPage } from './potsSlice';
import Pagination from './Pagination';

const PostsList = () => {
  const dispatch = useDispatch();
  const { posts, currentPage } = useSelector((state) => state.posts);

  const itemsPerPage = 6;
  const totalItems = posts.length;

  // Calculate current posts for display
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);

  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  // Helper to generate consistent date string based on post id
  const getPostDate = (id) => {
    // Dec 21, 2020 timestamp + offset per ID
    const date = new Date(1608562620000 + id * 3600000 * 4);
    return date.toUTCString().replace('GMT', 'GMT');
  };

  return (
    <div className="posts-section">
      <div className="posts-grid">
        {currentPosts.map((post) => (
          <div key={post.id} className="post-card">
            {/* Red Cross Icon */}
            <button 
              className="delete-btn" 
              onClick={() => handleDelete(post.id)}
              aria-label="Remove card"
            >
              &times;
            </button>

            <div className="post-card-content">
              {/* Title - truncated nicely if too long */}
              <h3 className="post-title">
                {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
              </h3>
              
              {/* Body */}
              <p className="post-body">
                {post.body.charAt(0).toUpperCase() + post.body.slice(1)}
              </p>
              
              {/* Date */}
              <span className="post-date">{getPostDate(post.id)}</span>
            </div>

            {/* Visual card image at the bottom */}
            <div className="post-image-wrapper">
              <img 
                src={`https://picsum.photos/id/${(post.id % 50) + 10}/300/150`} 
                alt="Post illustration" 
                className="post-image"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PostsList;
