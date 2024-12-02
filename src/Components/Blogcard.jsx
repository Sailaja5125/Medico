import React from 'react'
import '../Style/Blogcard.css'
export default function Blogcard({blog , blogimage ,bloghead}) {
  return (
    <div>
    
<div className="post-card">
  <div className="avatar"></div>
  <a href={blog} className="title">{bloghead}</a>
  <span className="datetime">Website</span>
  <div className="image-preview"><img src={blogimage} alt="/" className='image-preview'/></div>
  <div className="comment-like">
    <span></span>
    <span></span>
  </div>
</div>
    </div>
  )
}
