

import React, {useState, useEffect, useRef} from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import toast from "react-hot-toast";



function Manger() {
    
    const initForm = {site: "", username: "" , password: "" }
    const[form,setForm] = useState(initForm);
    const[openEye, setOpenEye] = useState(true);
    const[isPasswordVisible,SetIsPasswordVisible] = useState(false);
    const[passwordArray,setPasswordArray] = useState([]);
    const[searchText,setSearchText] = useState("");

    useEffect(()=>{

        const fetchData = async()=>{
            try {
                const response = await fetch("http://localhost:3000/api/v1/password/all");
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                
                const data = await response.json();
                setPasswordArray(data.passwords)
                console.log(data)

            } catch (error) {
                console.log("Error fetching password")
            }
        }
        fetchData(); 
         
    },[]);

    const textCopy = (text)=> {
      
        navigator.clipboard.writeText(text);

        toast.success('🦄 Copy to Clipboard !')
    }

   
    const handlePasswordVisibility = (e)=>{
          
          SetIsPasswordVisible((value)=> !value) 
          if(openEye){
              e.target.src = "./icons/close-eye.png";
              e.target.alt = "close-eye"
              setOpenEye(false);
          }
          else{
             e.target.src = "./icons/open-eye.svg";
             e.target.alt = "open-eye"
             setOpenEye(true);
          }

    }
    
    const savePassword = ()=>{  
         

         if(form.site.length > 3 && form.username.length > 3 && form.password.length > 7){
          const _id = uuidv4();
          setPasswordArray([{...form, _id}, ...passwordArray]);
           
          const saveInfo = async()=>{
            console.log("in saveInfo")
            try{
                const response = await fetch("http://localhost:3000/api/v1/password/create", {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    // Add any other headers if needed
                    },
                    body: JSON.stringify({...form, _id})
                });
            
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const data = await response.json();
                console.log(data);
            
                } catch (error) {
                console.log("Error posting data:", error);
            } 
          }
          saveInfo();

          setForm(initForm);
          toast.success("password is saved successfully")

         }
        
         
    }

    const deletePassword = async(_id)=>{
        setPasswordArray(passwordArray.filter(item=>item._id !== _id));

        try{
            console.log("in dele promise")
            const response = await fetch(`http://localhost:3000/api/v1/password/${_id}`,{
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json'
                // Add any other headers if needed
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            console.log(data);
        
            } catch (error) {
            console.log("Error posting data:", error);

        }
        
        
    }
   
    const updatePassword = async(_id)=>{
        setForm(passwordArray.filter(item=>item._id === _id)[0]); 
        setPasswordArray(passwordArray.filter(item=>item._id !== _id));
        try{
            console.log("in dele promise")
            const response = await fetch(`http://localhost:3000/api/v1/password/${_id}`,{
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json'
                // Add any other headers if needed
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            console.log(data);
        
            } catch (error) {
            console.log("Error posting data:", error);

        }
    
    }

    const handleChange = (e)=>{          
        setForm({...form, [e.target.name]: e.target.value });
    }




 
    return (
        <>
         <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]">
            </div>
        </div>
        
        {/* main content */}
        <div className="mycontainer border border-10 ">
          <h1 className="logo font-bold text-2xl font-bold text-center text-2xl">
                  <span className='text-green-700'>&lt;</span>
                     Pass
                  <span className='text-green-700'>Op/&gt;</span>
          </h1>
            <p className='text-green-700 text-center text-lg' >Your Own Password Manager</p> 


            <div className='flex flex-col p-4 text-black gap-8 items-center'>
                

                <input 
                   className='rounded-full border border-green-500 w-full p-4 py-1' type="text"  
                   placeholder="enter your website URL"
                   name="site"
                   value={form.site}
                   onChange={handleChange} 
                   id='site'
                
                />

                <div className="flex flex-col md:flex-row w-full justifly-between gap-8">
                    <input 
                      className='rounded-full border border-green-500 w-full p-4 py-1'  type="text" placeholder="enter your username"
                      name="username"
                      value={form.username}
                      onChange={handleChange} 
                      id='username'
                    
                    />

                    <div className="relative w-80">
                        <input 
                           className='rounded-full border border-green-500 w-full p-4 py-1' 
                           type={isPasswordVisible ? "text" : "password"}    
                           placeholder='enter your password'
                           name="password"
                           value={form.password}
                           onChange={handleChange} 
                        />

                        <span className='absolute right-[10px] top-[1px] cursor-pointer '>
                                <img width={30} src="./icons/open-eye.svg" alt="open-eye" onClick={handlePasswordVisibility} />
                        </span>
                    </div>
                   
                  
                </div>
                <button className="flex border w-fit text-black justify-center items-center bg-green-600 rounded-full px-5 py-2 hover:text-white gap-3" onClick={savePassword} > 
                     <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="loop-on-hover">
                     </lord-icon> 
                     Save
                </button>
            </div>

            {/* passwrods section */}
             
            <div>
                    <div className="flex justify-between">
                    <h2 className="font-bold text-2xl py-2">Your Passwords</h2>
                        <div>
                        <input 
                            className='rounded-full border border-green-500 p-4 py-2'  
                            type="text" 
                            placeholder="Search..."
                            name="search"
                    
                            />
                            <button 
                            type="submit" 
                            className="bg-gray-800 text-white px-4 py-2 rounded-full ml-2 focus:outline-none lg:inline-block"
                            onClick={()=>searchPasswords()}
                            >
                           
                            Search
                            </button>
                        </div>                        
                    </div>
            </div>


            {passwordArray.length == 0 && <div className='text-center text-3xl font-bold py-12' >No Password to show</div>}

            {passwordArray.length != 0 &&
            <>
            {/* password sectiion */}
             <div className='min-h-11'>
                <table className="table-auto w-full my-2 rounded-md overflow-hidden">
                    <thead className='bg-green-800 text-white '>
                        <tr>
                            <th className='py-2'>Site</th>
                            <th className='py-2'>username</th>
                            <th className='py-2'>password</th>
                            <th className='py-2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='bg-green-100'>

                        {passwordArray.map((item, i)=>{
                            return <tr key={i}>

                                    <td className='py-2 border border-white text-center w-32'> 
                                        <div className='flex justify-center gap-2'>
                                            <a href={item.site} target='_blank' className='copy-btn' >{item.site}</a>
                                            <img className='cursor-pointer'  width={25} src="./icons/copy-icon.png" alt="copy-icon" onClick={()=>{textCopy(item.site)}} />    
                                        </div>   
                                    </td>

                                    <td className='py-2 border border-white text-center w-32'> 
                                        <div className='flex justify-center gap-2'>
                                            <p className='copy-btn'>{item.username}</p>
                                            <img className='cursor-pointer'  width={25} src="./icons/copy-icon.png" alt="copy-icon"  onClick={()=>{textCopy(item.username)}}/>    
                                        </div>   
                                    </td>

                                    <td className='py-2 border border-white text-center w-32'> 
                                        <div className='flex justify-center gap-2'>
                                            <p className='copy-btn' >************</p>
                                            <img className='cursor-pointer'  width={25} src="./icons/copy-icon.png" alt="copy-icon" onClick={()=>{textCopy(item.password)}}/>    
                                        </div>   
                                    </td>

                                    <td className='py-2 border border-white text-center w-32'> 
                                         <div className='flex justify-evenly'>
                                            <span className='cursor-pointer'><img width={40} src="./icons/edit.png" alt="" onClick={()=>{updatePassword(item._id)}} /></span>
                                            <span className='cursor-pointer'><img width={40} src="./icons/delete.png" alt=""  onClick={()=>{deletePassword(item._id)}} /></span>
                                         </div> 
                                    </td> 

                                 </tr>
                        })}
                    </tbody>
               </table>
             </div>
             </>
            }

        </div>  
    </>
    )
}

export default Manger;




