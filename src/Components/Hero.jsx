import React from 'react'
import '../Style/Hero.css'
import img from '../Images/hospitalimages.jpg' 
import img2 from '../Images/hospitalimages2.jpg' 
import img5 from '../Images/blog3.jpg'
import img6 from '../Images/blog4.jpg'
import img7 from '../Images/blog5.jpg'
import Blogcard from './Blogcard'
import Subscription from './Subscription'


export default function Hero() {
  return (
    <div>
      <div className="corrousel">
           <div className='hero-content'>
            <h1>A Great Place to <br/>  Receive Care</h1>
            <p>Medical Recover is most focused in helping you 
            <br/>discover your most beauiful life</p>
            <div className="buttons">
            <button className='first'>Learn more</button>
            <button className='second'>Get a Quote</button>
          </div>
           </div>
           <div className='hero-image'>
          <img src={img} alt="heroimage" />
          </div>
      </div>
      <div className="small-container">
           <div className="box">
             <div className="icons">
             <i class="fa-solid fa-notes-medical"></i>
             </div>
             <h5>Recomended Products</h5>
             <p>WE recomend you the best products in reasonable amount with super fast delivery </p>
            </div>               
            <div className="box">
             <div className="icons">
             <i class="fa-solid fa-user-nurse"></i>
             </div>
             <h5>Health Updates</h5>
             <p>Get the daily dose of health content by visiting our Blog page</p>
            </div>               
            <div className="box">
             <div className="icons">
             <i class="fa-solid fa-user-doctor"></i>
             </div>
             <h5>Meet our doctors</h5>
             <p>Consult our doctors for free and get daily checkup directly from home</p>
            </div>               
      </div>
      <div className="numbers">
        <div className="num1">
          <h1>15K</h1>
          <p>public customers</p>
        </div>
        <div className="num1">
          <h1>1K</h1>
          <p>public customers</p>
        </div><div className="num1">
          <h1>26k</h1>
          <p>public customers</p>
        </div><div className="num1">
          <h1>700K</h1>
          <p>public customers</p>
        </div>
      </div>
      <div className="part1">
        <div className="part1-text">
            <h1>Our Recomended 
            Hospitals</h1>
            <p>Problems trying to resolve the conflict between 
            the two major realms of Classical physics: 
            Newtonian mechanics</p>
            <a href="#">learn more</a>
        </div>
        <div className="part1-image">
           <img src={img2} alt="" style={{
            height:"100%",
            margin:"24px"
           }}/>
        </div>
      </div>
      <div className="part3">
      <div className="part3-text">
            <h1>Our 
            Blogs</h1>
            <p>Problems trying to resolve the conflict between 
            the two major realms of Classical physics: 
            Newtonian mechanics</p>
            <a href="/blog">learn more</a>
        </div>
        <div className="blog-container">
          <Blogcard blog={"https://blog.calm.com/"} blogimage={img5} bloghead={"Meditation and mindfullness"}/>
          <Blogcard blog={"https://www.npr.org/sections/health-shots/"} blogimage={img6} bloghead={"health shots"}/>
          <Blogcard blog={"https://blog.calm.com/"} blogimage={img7} bloghead={"Exercise and fitness"}/>
        </div>
      </div>

      <div className="subscription-footer">
        <Subscription/>
      </div>

    </div>
  )
}
