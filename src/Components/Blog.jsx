import React, { useState, useEffect } from 'react';
import '../Style/Blog.css';
import Blogcard from './Blogcard';
import Blogpost from './Blogpost';
import img from '../Images/blog.jpg'
import img2 from '../Images/blog1.jpeg'
import img3 from '../Images/blog2.jpg'
export default function Blog() {
  const [blogs, setBlogs] = useState([]);

  const fetchAllBlogs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/blog/bloglist', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('auth-token')}`
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      setBlogs(data.data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  // Filter blogs where owner's occupation is "doctor"
  const doctorBlogs = blogs.filter(blog => blog.owner.occupation === 'Doctor'||blog.owner.occupation === 'doctor');

  return (
    <div className='BLOG'>
      <h1>Blogs</h1>
      <a href="/writeblog"><button>Write a Blog</button></a>
      {doctorBlogs.map(blog => (
        <Blogpost key={blog._id} blog={blog} />
      ))}
      <h1>Related Blogs</h1>
      <div className="related-blogs">
        <Blogcard blog={"https://artofhealthyliving.com/"} blogimage={img} bloghead={"Art of living"}/>
        <Blogcard blog={"https://www.shape.com/fitness"} blogimage={img2} bloghead={"Fitness and Wellbeing"}/>
        <Blogcard blog={"https://bitesofwellness.com/"} blogimage={img3} bloghead={"bites of wellness"}/>
      </div>
    </div>
  );
}

