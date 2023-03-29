import  Announcements from '../components/Announcements'
import React from 'react'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import Slide from '../components/Slide'
import Categories from '../components/Categories'
import Products from '../components/Products'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import { useState } from 'react'
import { useEffect } from 'react'



const Home = (props) => {
  var [data, setData] = useState();
  var [filter, setFilter] = useState(1);
  useEffect(()=>{
      fetch('http://localhost:4000/api/product',{
        method: 'get',
      })
      .then(x=>x.json())
      .then((y)=>{
        console.log(y,"response data")
        setData(y)
      });
    },[]);
  return (
    <div>
        
         <Navbar props={props}/>
         {/* <Announcements/> */}
         <Slider/>
         <h1 style = {{textAlign:"center", margin:"20px", color:"white"}}> CATEGORIES </h1>
         <Categories/>
         <h1 style = {{textAlign:"center", margin:"20px",color:"white"}}> PRODUCTS </h1>
         <props.ThreeDots wrapperClass="react-spinner"
          height="80" 
          width="80" 
          radius="9"
          color="#4fa94d" 
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={(data)?false:true}
          />
         <Products props={props} products={data && data}/>
         {/* <Slide/> */}
         <Newsletter/>
         <Footer />
         
    </div>
  )
}

export default Home