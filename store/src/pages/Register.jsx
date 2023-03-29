import styled from "styled-components";

import './Register.css';
import Navbar from '../components/Navbar'
import { NavLink } from "react-router-dom";


const Container = styled.div`
  width: 100vw;
  height: 100vh;

  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`

  width: 40%;
  padding: 20px;
  background-color: rgb(70, 52, 52);
  box-shadow: 0px 0px 8px 2px rgb(36, 10, 10);
 
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  text-align:center;
  color: white;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
 
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
  color: white;
`;

const Button = styled.button`
  width: 20%;
  border: none;
  padding: 15px 20px;
  background-color: rgb(61, 9, 9);
  color: white;
  
  cursor: pointer;
`;

const Register = () => {
  var validation = false;
  const validate = () =>{
  let fname = document.getElementById('fname').value;
  if(fname ==""){
    document.getElementById('fname').style.border="2px solid red";
    validation = false;
  }else{
    document.getElementById('fname').style.border = "2px solid green";
    validation = true;
  }
  let lname = document.getElementById('lname').value;
  if(lname ==""){
    document.getElementById('lname').style.border="2px solid red";
    validation = false;
  }else{
    document.getElementById('lname').style.border = "2px solid green";
    validation = true;
  }
  let email = document.getElementById('email').value;
  if(email ==""){
    document.getElementById('email').style.border="2px solid red";
    validation = false;
  }else{
    document.getElementById('email').style.border = "2px solid green";
    validation = true;
  }
  let userContact = document.getElementById('contact').value;
  if(userContact ==""){
    document.getElementById('contact').style.border="2px solid red";
    validation = false;
  }else{
    document.getElementById('contact').style.border = "2px solid green";
    validation = true;
  }
  let password = document.getElementById('pass').value;
  if(password ==""){
    document.getElementById('pass').style.border="2px solid red";
    validation = false;
  }else{
    document.getElementById('pass').style.border = "2px solid green";
    validation = true;
  }
  let cpass = document.getElementById('cpass').value;
  if(cpass != password){
    document.getElementById('cpass').style.border="2px solid red";
    validation = false;
  }else{
    document.getElementById('cpass').style.border = "2px solid green";
    validation = true;
  }
}

var handleSubmit = (e)=>{
  validate();
  if(validation) {
    var urlencoded = new URLSearchParams();
    urlencoded.append("username",document.querySelector("#fname").value
     + " " + document.querySelector("#lname").value);
    urlencoded.append("password",document.querySelector("#pass").value);
    urlencoded.append("email",document.querySelector("#email").value);
    urlencoded.append("contact",document.querySelector("#contact").value);
    urlencoded.append("isAdmin","false");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    fetch('http://localhost:4000/api/auth/register',{
      method: 'post',
      headers: myHeaders,
      body: urlencoded
    })
    .then(x=>x.json())
    .then((y)=>{
      console.log(y,"response data")
      window.location.href = "/login";
    })
  }
}
  return (
    <div>
    {/* <Navbar/> */}
    <Container  className="register-pic">
    
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="First name" id="fname" />

          <Input placeholder="Last name" id="lname" />
          <Input placeholder="phone number" id="contact" />
          <Input placeholder="email" id="email"/>
          <Input type="password" placeholder="password" id="pass" />
          <Input placeholder="confirm password" id="cpass" />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
      <Button type="button" onClick={handleSubmit}>CREATE</Button><br/>
      <NavLink style={{textDecoration: "none",color: "white",width: "100%",textAlign: "center"}} to='/login'>Already have Account</NavLink>
        </Form>
      </Wrapper>
    </Container>
    </div>
  );
};

export default Register;