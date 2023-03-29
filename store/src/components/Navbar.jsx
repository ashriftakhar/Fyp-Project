import { AiOutlineSearch } from 'react-icons/ai'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import React from 'react'
import styled from 'styled-components'
import { Link, NavLink, useNavigate, Navigate } from 'react-router-dom';
import './Navbar.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Container = styled.div`
height:70px;
font-size: 36px;
background-color: #000;
`
const Wrapper = styled.div`
padding:10px 20px;
display:flex;
justify-content: space-between;
align-items:center;`

const Left = styled.div`
flex:1;
display:flex;
align-items:center;`
const Language = styled.span`
font-size:14px;`

const SearchContainer = styled.div`
border:0.5px solid lightgray;
display:flex;
align-items:center;
padding:5px;
margin-left:15px;`
const Input = styled.input`
border:none;
`
const Center = styled.div`
flex:1;
font-weight:bold;
text-align:center;`

const Right = styled.div`
flex:1;
display:flex;
align-items:center;
justify-content:flex-end;
`
const MenuItems = styled.div`
font-size:14px;
margin:10px;
cursor:pointer;
`
const Navbar = (props) => {
  var [data, setData] = useState();
  var [flag, setFlag] = useState(false);
  var [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  
  var headers = new Headers();
  let t = JSON.parse(localStorage.getItem("user"));
  headers.append("token",t.accessToken);
  
  useEffect(()=>{
    handleSearch();
  },[keyword])

  useEffect(()=>{
    fetch("http://localhost:4000/api/cart",{
      method: "get",
      headers: headers,
    })
    .then(x=>x.json())
    .then(y=>{
      setData(y);
    })
    .catch(err=>{
      console.log(err);
    })
  },[props?.props?.mainFlag]);
const handleFocus = ()=>{
    navigate('/productList');
  }
  const handleSearch = ()=>{

    let formData = new URLSearchParams();
    formData.append("keyword",keyword && keyword);

    fetch('http://localhost:4000/api/searchByKeyword',{
      method: 'post',
      body: formData,
    })
    .then(x=>x.json())
    .then((y)=>{
      console.log(y);
      props.setData(y)
    })
    .catch((err)=>{
      // toast("error occured finding products!");
    });
  }
  return (
     <Container className="container">
         <Wrapper className="wrapper">

         <Left>
          <Language style={{color:'white',}}>Search</Language>
           <SearchContainer>
             <Input onChange={(e)=>{
              setKeyword(e.target.value);
             }} onFocus={handleFocus}/>
         <AiOutlineSearch style= {{color:"white" , fontSize:16}}/>
           </SearchContainer>
           
         </Left>
         <NavLink style={{color:'#e31b21', textDecoration:'none'}} to="/"><Center><logo>Elite Gaming Store</logo></Center></NavLink>

         <Right className='navbar-menu'>
          
           <NavLink style={{color:'white', textDecoration:'none'}} to="/"><MenuItems >Home</MenuItems></NavLink>
           <NavLink style={{color:'white', textDecoration:'none'}} to="/Register"><MenuItems >Register</MenuItems></NavLink>
           <NavLink style={{color:'white', textDecoration:'none'}} to="/login"><MenuItems  >Login </MenuItems></NavLink>
           <NavLink style={{color:'white', textDecoration:'none'}} to="/cart"><MenuItems  > Cart  </MenuItems></NavLink>
           <NavLink style={{color:'white', textDecoration:'none'}} to="/productlist"><MenuItems  > ProductList </MenuItems></NavLink>
           <NavLink style={{color:'white', textDecoration:'none'}} to="/cart">
            <MenuItems data-total={data?.products?.length} className='shopping-cart-icon'>
                <ShoppingCartOutlinedIcon/>
            </MenuItems>
          </NavLink>
          <Profile/>
           
         </Right>

         </Wrapper>
     </Container>
    
  )
}

const Profile = ()=> {
  let user = localStorage.getItem("user");
  if(user) {
    let u = JSON.parse(user);
    if(u?.accessToken) {
      return (
            <div className='user-profile'>
                <img src='https://api.lorem.space/image/face' width="40" height="40" style={{
                  borderRadius: "50%",
                  cursor: "pointer"
                  }} />
                  <ul>
                    <li onClick={(e)=>{
                      window.localStorage.clear();
                      window.location = "/Login";
                    }}>signout</li>
                  </ul>
               </div>
            );
    } else {
      return '';
    }
  } else {
    return ''
  }
}

const ProtectedRoute = ({
  redirectPath = '/Login',
  children,
}) => {
  console.log("idhr e hai")
  let user = localStorage.getItem("user");
  if (user) {
    let u = JSON.parse(user);
    if(u?.accessToken) {
      return children;
    } else {
      return <Navigate to={redirectPath} replace />;
    }
  } else {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default Navbar
