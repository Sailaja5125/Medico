import React from 'react';
import '../Style/Blogpost.css';

export default function Blogpost({ blog }) {
  return (
    <div className="post">
      <div className="profile">
        <div className="profile-image">
          <img src={blog.owner.avatar} alt="Profile" className='profile-image'/>
        </div>
        <div className="profile-info">
          <h6>{blog.owner.username}</h6>
          <p>{blog.owner.occupation}</p>
        </div>
      </div>
      <div className="post-box">
        <h1>{blog.title}</h1>
        <h4 style={
          {
            color:"#FF685B",
            fontSize:'14px',
            marginTop:"0px"
          }
        }>{blog.subtopics}</h4>
        <div className="post-image">
          <img src={blog.image} alt="Blog" className='post-image'/>
        </div>
        <div className="post-contains">
          <p>{blog.content}</p>
        </div>
      </div>
    </div>
  );
}
