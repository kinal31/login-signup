import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { toast } from 'react-toastify'
axios.defaults.baseURL = "http://localhost:8080/signup"


const Signup = () => {
  const [name ,setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  console.log(name, email, password);

  const handleSubmit = async(e) =>{
    e.preventDefault()
    try{

      const response = await axios.post("http://localhost:4000/api/signup",{name, email ,password})
      console.log(response);

      if(response.data.err){
        toast.error(response.data.message)
      }
      if(response.data.success){
        toast.success(response.data.message)
        setName('')
        setEmail('')
        setPassword('')
        navigate('/')
      }
    }
    catch(err){
      // toast.error(error)
      if (err.response.status === 400) {
        toast.error("Fill all the data");
      }
      if (err.response.status === 409) {
        toast.error("User already exist");
      }
      if (err.response.status === 401) {
        toast.error(err.response.data.message);
      }
    }    
  }


  return (
    <>
      {/* <h1>signup</h1> */}
  <section className="intro">
  <div className="mask d-flex align-items-center h-100" style={{backgroundColor: "#D6D6D6"}}>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card" style={{borderRadius : "1rem"}}>
            <div className="card-body p-5 text-center">

              <div className="my-md-5 pb-5">

                <h3 className="fw-bold mb-2">Welcome to Signup page</h3>

                {/* <i className="fas fa-user-astronaut fa-3x my-5"></i> */}
                {/* <form> */}
                <div className="mb-4">
                  <label className="htmlForm-label" htmlFor="typeName">Name</label>
                  <input type="text" id="name" className="form-control form-control-lg" 
                  value={name} onChange={(e) =>setName(e.target.value)}/>
                </div>

                <div className="mb-4">
                  <label className="form-label" htmlFor="typeEmail">Email</label>
                  <input type="email" id="typeEmail" className="form-control form-control-lg" 
                  value={email} onChange={(e) =>setEmail(e.target.value)} />
                </div>

                <div className="mb-4">
                  
                  <label className="form-label" htmlFor="typePassword">Password</label>
                  <input type="password" id="typePassword" className="form-control form-control-lg" 
                  value={password} onChange={(e) =>setPassword(e.target.value)} autoComplete="new-password"/>
                  
                </div>

                <button className="btn btn-primary btn-lg btn-rounded gradient-custom text-body px-5" type="submit" style={{backgroundColor : "#b0bccf"}} onClick={handleSubmit}>Sign up</button>

                {/* </form> */}
              </div>

              <div>
                <p className="mb-0">Already a member?<Link to={"/"} className="text-body fw-bold"> Login</Link></p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  )
}

export default Signup
