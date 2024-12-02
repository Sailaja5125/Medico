import React, { useState } from 'react';
import '../Style/WriteBlog.css';

export default function WriteBlog() {
  const [blogTitle, setBlogTitle] = useState('');
  const [SubTitle, setSubTitle] = useState('');
  const [blogDescription, setBlogDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCreateBlog = async () => {
    try {
      // Create a FormData object to send the data
      const formData = new FormData();
      formData.append('title', blogTitle);
      formData.append('subtopics', blogTitle);
      formData.append('content', blogDescription);
      formData.append('image', selectedImage); // Assuming you have an input field for image selection

      // Make a POST request to create the blog
      const response = await fetch('http://localhost:5000/api/v1/blog/createblog', {
        method: 'POST',
        headers: {
          'Authorization': `${localStorage.getItem('auth-token')}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      // Handle success (e.g., show a success message)
      console.log('Blog created successfully!');
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <div className='WriteBlog'>
      <div className="container">
        <div className="modal">
          <div className="modal__header">
            <span className="modal__title">New Blog</span>
            <button className="button button--icon"></button>
          </div>
          <div className="modal__body">
            <div className="input">
              <label className="input__label">Blog Title</label>
              <input
                className="input__field"
                type="text"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                required
              />
              <p className="input__description">The title must contain a maximum of 32 characters</p>
            </div>
            <div className="input">
              <label className="input__label">Blog SubTitle</label>
              <input
                className="input__field"
                type="text"
                value={SubTitle}
                onChange={(e) => setSubTitle(e.target.value)}
                required
              />
              <p className="input__description">The title must contain a maximum of 32 characters</p>
            </div>
            <div className="input">
              <label className="input__label">Description</label>
              <textarea
                className="input__field input__field--textarea"
                value={blogDescription}
                onChange={(e) => setBlogDescription(e.target.value)}
                required
              ></textarea>
              <p className="input__description">Give your blog a good description so everyone knows what it's about</p>
            </div>
            <div className="input">
              <label className="input__label">Images</label>
              <input
                className="input__field"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => setSelectedImage(e.target.files[0])}
                required
              />
              <p className="input__description">In jpeg / png format</p>
            </div>
          </div>
          <div className="modal__footer">
            <button className="button button--primary" onClick={handleCreateBlog}>
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
