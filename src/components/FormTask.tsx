import React from 'react'
import {useForm} from "react-hook-form"
import { useState } from 'react';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';


import {DevTool} from "@hookform/devtools"
import "./FormTask.css"

let renderCount=0

type FormValues = {
    firstname: string
    lastname:string
    phonenumber:string
    email:string
    gender: 'male' | 'female'; // Type for gender field, only allowing 'male' or 'female'
    subjects: string[]; // Type for subjects field, an array of strings
    id:string

}

export default function FormTask() {

  
  const [formDataList, setFormDataList] = useState<FormValues[]>([]);
  //const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingIndex, setEditingIndex] = useState<string | null>(null);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);




  const form=useForm<FormValues>();
  const {register, control, handleSubmit,formState, setValue}=form;
  const {errors}=formState;

    console.log('error: ',errors)
  // useEffect(() => {
  //   // Update local storage whenever formDataList changes
  //   localStorage.setItem('formDataList', JSON.stringify(formDataList));
  // }, [formDataList]);

  useEffect(() => {
    // Retrieve data from local storage when component mounts
    const storedFormDataList = localStorage.getItem('formDataList');
    if (storedFormDataList) {
      setFormDataList(JSON.parse(storedFormDataList));
    }
  }, []); // Empty dependency array ensures this effect runs only once when component mounts



  // const onSubmit = (data: FormValues) => {
  //   console.log('form submitted', data);
  //   const updatedFormDataList = [...formDataList, data];
  //   setFormDataList(updatedFormDataList);
  //   form.reset(); // Reset the form after submission
  // };

//   const onSubmit = (data: FormValues) => {
//     if (editingIndex !== null) {
//         const updatedFormDataList = [...formDataList];
//         updatedFormDataList[editingIndex] = data;
//         setFormDataList(updatedFormDataList);
//         setEditingIndex(null);
//     } else {
//         const updatedFormDataList = [...formDataList, data];
//         setFormDataList(updatedFormDataList);
//     }
//     form.reset();
//     localStorage.setItem('formDataList', JSON.stringify(formDataList)); // Update local storage after form submission
// }; 

// Update the form data list with the latest form submission
// const onSubmit = (data: FormValues) => {
//   if (editingIndex !== null) {
//       // If editing an existing entry, update the corresponding index
//       const updatedFormDataList = [...formDataList];
//       updatedFormDataList[editingIndex] = data;
//       setFormDataList(updatedFormDataList); // Update form data list

//       // Update local storage after form submission
//       localStorage.setItem('formDataList', JSON.stringify(updatedFormDataList));

//       setEditingIndex(null); // Reset editing index
//   } else {
//       // If creating a new entry, add it to the form data list
//       const updatedFormDataList = [...formDataList, data];
//       setFormDataList(updatedFormDataList); // Update form data list

//       // Update local storage after form submission
//       localStorage.setItem('formDataList', JSON.stringify(updatedFormDataList));
//   }
//   form.reset(); // Reset the form after submission
// };
// const onSubmit = (data: FormValues) => {
//     if (editingIndex !== null) {
//         // If editing an existing entry, update the corresponding index
//         const updatedFormDataList = [...formDataList];
//         updatedFormDataList[editingIndex] = { ...data, id: formDataList[editingIndex].id };
//         setFormDataList(updatedFormDataList);
//         localStorage.setItem('formDataList', JSON.stringify(updatedFormDataList));
//         setEditingIndex(null);
//     } else {
//         // If creating a new entry, generate a unique ID and add it to the data
//         const id = uuidv4(); // Generate a unique ID using uuid or any other library
//         const updatedFormDataList = [...formDataList, { ...data, id }];
//         setFormDataList(updatedFormDataList);
//         localStorage.setItem('formDataList', JSON.stringify(updatedFormDataList));
//         console.log(updatedFormDataList);
        
//     }
//     form.reset();
// };

// const onSubmit = (data: FormValues) => {
//     const id = uuidv4(); // Generate a unique ID for the new entry
//     const updatedFormDataList = [...formDataList, { ...data, id }];
//     setFormDataList(updatedFormDataList);
//     localStorage.setItem('formDataList', JSON.stringify(updatedFormDataList));
//     form.reset(); // Reset the form after submission
// };

// const onSubmit = (data: FormValues) => {
//     // Check if the email or phone number already exists in formDataList
//     const isDuplicateEmail = formDataList.some(formData => formData.email === data.email);
//     const isDuplicatePhoneNumber = formDataList.some(formData => formData.phonenumber === data.phonenumber);
    
//     // If a duplicate email or phone number is found, display an error message
//     if (isDuplicateEmail || isDuplicatePhoneNumber) {
//         if (isDuplicateEmail) {
//             console.error("Email already exists. Please use a different email.");
//         }
//         if (isDuplicatePhoneNumber) {
//             console.error("Phone number already exists. Please use a different phone number.");
//         }
//         return; // Stop form submission
//     }

//     // If no duplicates found, proceed with adding the entry
//     const id = uuidv4();
//     const updatedFormDataList = [...formDataList, { ...data, id }];
//     setFormDataList(updatedFormDataList);
//     localStorage.setItem('formDataList', JSON.stringify(updatedFormDataList));
//     form.reset(); // Reset the form after submission
// };
// {emailError && <p className="error">{emailError}</p>}
// {phoneError && <p className="error">{phoneError}</p>}



const onSubmit = (data: FormValues) => {
    const isDuplicateEmail = formDataList.some(formData => formData.email === data.email && formData.id !== editingIndex);
    const isDuplicatePhoneNumber = formDataList.some(formData => formData.phonenumber === data.phonenumber && formData.id !== editingIndex);
    
    // If a duplicate email or phone number is found, display an error message
    if (isDuplicateEmail || isDuplicatePhoneNumber) {
        if (isDuplicateEmail) {
            setEmailError("Email already exists. Please use a different email.");
        }
        if (isDuplicatePhoneNumber) {
            setPhoneError("Phone number already exists. Please use a different phone number.");
        }
        return; // Stop form submission
    }

    if (editingIndex !== null) {
        const updatedFormDataList = formDataList.map(formData => {
            if (formData.id === editingIndex) {
                return { ...data, id: formData.id };
            }
            return formData;
        });
        setFormDataList(updatedFormDataList);
        localStorage.setItem('formDataList', JSON.stringify(updatedFormDataList));
        setEditingIndex(null);
    } else {
        const id = uuidv4();
        const updatedFormDataList = [...formDataList, { ...data, id }];
        setFormDataList(updatedFormDataList);
        localStorage.setItem('formDataList', JSON.stringify(updatedFormDataList));
    }
    form.reset();
};


// Render error messages in your JSX
// {emailError && <p className="error">{emailError}</p>}
// {phoneError && <p className="error">{phoneError}</p>}





//   const handleEdit = (index: number) => {
//     const formDataToEdit = formDataList[index];
//     Object.keys(formDataToEdit).forEach(key => {
//         setValue(key as keyof FormValues, formDataToEdit[key as keyof FormValues]);
//     });
//     setEditingIndex(index);
// };

// const handleEdit = (id: string) => {
//     const index = formDataList.findIndex(formData => formData.id === id);
//     if (index !== -1) {
//         const formDataToEdit = formDataList[index];
//         Object.keys(formDataToEdit).forEach(key => {
//             setValue(key as keyof FormValues, formDataToEdit[key as keyof FormValues]);
//         });
//         setEditingIndex(id);
//     } else {
//         console.error(`Form data with ID ${id} not found.`);
//     }
// };
const handleEdit = (id: string) => {
    const index = formDataList.findIndex(formData => formData.id === id);
    if (index !== -1) {
        const formDataToEdit = formDataList[index];
        Object.keys(formDataToEdit).forEach(key => {
            setValue(key as keyof FormValues, formDataToEdit[key as keyof FormValues]);
        });
        setEditingIndex(id);
    } else {
        console.error(`Form data with ID ${id} not found.`);
    }
};



// const handleDelete = (index: number) => {
//     const updatedFormDataList = [...formDataList];
//     updatedFormDataList.splice(index, 1);
//     setFormDataList(updatedFormDataList);
// };
const handleDelete = (id: string) => {
    const index = formDataList.findIndex(formData => formData.id === id);
    if (index !== -1) {
        const updatedFormDataList = [...formDataList];
        updatedFormDataList.splice(index, 1);
        setFormDataList(updatedFormDataList);
        localStorage.setItem('formDataList', JSON.stringify(updatedFormDataList));
    } else {
        console.error(`Form data with ID ${id} not found.`);
    }
};

    

  //renderCount++;
  //{renderCount/2} in h2
  console.log('formdata',formDataList)
  
  return (
    <>
<div className="container-fluid p-5 bg-primary text-white text-center">
    <h2>Student Registration Form </h2>                   
    </div>             
        <form onSubmit={handleSubmit(onSubmit)} noValidate>

        <div className="container mt-5">
        <div className="row">
    <div className="col-sm-6">
            {/* <div className='form-group'> */}
            <label htmlFor='firstname'>Firstname</label>
            <input 
            type='text' 
            id='firstname' 
            className="form-control" 
            {...register('firstname',{
                required:{
                   value:true,
                   message:"firstname is required"},
                pattern: {
                   value: /^[a-zA-Z]+$/, // Define your pattern here
                   message: "Firstname must contain only letters"
                   }
                   })}/>
                   <p className='error'>{errors.firstname?.message}</p>
                   
                   {/* <br/> */}
    </div>

    
    <div className="col-sm-6">
            <label htmlFor='lastname'>Lastname</label>
            <input type='text' id='lastname' className="form-control" {...register('lastname',{
                required:{
                   value:true,
                   message:"lastname is required"},
                   pattern: {
                    value: /^[a-zA-Z]+$/, // Define your pattern here
                    message: "lastname must contain only letters"
                    }

                   })}/>
                   <p className='error'>{errors.lastname?.message}</p>
                   <br/>
    </div>
</div>
</div>
            {/* <div className='form-group'> */}
            <div className="container mt-5">
        <div className="row">
    <div className="col-sm-6">
            <label htmlFor='phonenumber'>Phone Number</label>
            <input type='text' id='phonenumber' className="form-control" {...register('phonenumber',{
                required:{
                   value:true,
                   message:"phone number is required"},
                   pattern: {
                    value: /^\d{10}$/, // Assuming 10 digits phone number
                    message: "Please enter a valid 10-digit phone number"
                    }
                   })}/>
                   <p className='error'>{errors.phonenumber?.message}</p>
                   {/* <p className='error'>{errors.phonenumber?.message}</p> Display phone number error message */}
               <p className='error'>{phoneError}</p> {/* Display phoneError state */}
                   <br/>
    </div>

            {/* <label htmlFor='email'>Email</label>
            <input type='email' id='email' {...register('email',{
                required:{
                   value:true,
                   message:"email is required"},
                   pattern:{
                    value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message:"invalid format"

                   }
                   })} />   
                   
                   <p className='error'>{errors.email?.message}</p>
                   <br/> */}
            

            {/* Email field */}
            {/* <div className='form-group'> */}
            <div className="col-sm-6">
            <label htmlFor='email'>Email</label>
                {editingIndex !== null ? (
                    
                    // If editing an entry, find the formData with matching ID and display the email value as plain text
    <p>{formDataList.find(formData => formData.id === editingIndex)?.email}</p>
                ) : (
                    // If not editing, display the email input field
                    <>
                    <input
                        type='email'
                        className="form-control"
                        id='email'
                        {...register('email', {
                            required: {
                                value: true,
                                message: "email is required"
                            },
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "invalid format"
                            }
                        })}
                    />
                    <p className='error'>{errors.email?.message}</p>
                    <p className='error'>{emailError}</p> {/* Display emailError state */}
                    </>
                    
                )}
                {/* <p className='error'>{errors.email?.message}</p> */}
                {/* <p className='error'>{errors.email?.message}</p> Display email error message */}
            {/* <p className='error'>{emailError}</p> Display emailError state */}
                
            <br/>
                <br />
            </div>
</div>
</div>
            {/* <div className='form-group'> */}
            <div className="container mt-5">
        <div className="row">
    <div className="col-sm-6">
            <label>Gender:</label><br/>
            {/* <div className='form-check form-check-inline'> */}
            <label htmlFor='male' className="form-check-label">Male</label>
            <input type='radio' id='male' value="male" className="form-check-input" {...register('gender',{required:{
                   value:true,
                   message:"gender is required"}})}/>

     

            {/* <div className='form-check form-check-inline'> */}
            <label htmlFor='female' className="form-check-label">Female</label>
            
            <input type='radio' id='female' value="female" className="form-check-input" {...register('gender',{required:{
                   value:true,
                   message:"gender is required"}})}/><br/>
            <p className='error'>{errors.gender && 'Gender is required'}</p> {/* Display error message for gender validation */}
            <br />
            </div>
            


            <div className="col-sm-6">
           <label>Subjects:</label><br/>
           <input type="checkbox" id="math"  value="Math" {...register('subjects',{required:true})}/>
           <label htmlFor="math">Math</label><br/>
           <input type="checkbox" id="chemistry"  value="Chemistry" {...register('subjects',{required:true})}/>
           <label htmlFor="chemistry">Chemistry</label><br/>
           <input type="checkbox" id="physics"  value="Physics" {...register('subjects',{required:true})}/>
           <label htmlFor="physics">Physics</label><br/>
           <input type="checkbox" id="english"  value="English" {...register('subjects',{required:true})}/>
           <label htmlFor="english">English</label><br/>
           <input type="checkbox" id="geography"  value="Geography" {...register('subjects',{required:true})}/>
           <label htmlFor="geography">Geography</label><br/>
           <input type="checkbox" id="history"  value="History" {...register('subjects',{required:true})}/>
           <label htmlFor="history">History</label><br/>
           <p className='error'>{errors.subjects && 'At least one subject is required'}</p> {/* Display error message for subjects validation */}
           </div>
           </div>
           </div>

           {/* <div className="col-12">
            <button type="submit" className="btn btn-outline-primary" >Submit</button>
        </div> */}
        <button type="submit" className="btn btn-outline-primary">
            {editingIndex !== null ? 'Update' : 'Submit'}
       </button>


        </form>

        <h2>Form Data List</h2>

        <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Subjects</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {formDataList.map((formData, index) => (
                        <tr key={index}>
                            <td>{formData.firstname} {formData.lastname}</td>
                            <td>{formData.phonenumber}</td>
                            <td>{formData.email}</td>
                            <td>{formData.gender}</td>
                            <td>{formData.subjects.join(', ')}</td>
                            <td>
                                {/* <button onClick={()=>handleEdit(index)}>
                                <FontAwesomeIcon icon={faEdit} /></button><br/> */}
                                <button onClick={() => handleEdit(formData.id)}>
    <FontAwesomeIcon icon={faEdit} /></button>
                            <button onClick={()=>handleDelete(formData.id)}>
                                <FontAwesomeIcon icon={faTrash} /></button></td>
                           
                            

                        </tr>
                    ))}
                </tbody>
            </table>

      {/* <ul>
        {formDataList.length>0 && formDataList.map((formData, index) => (
          <li key={index}>
            <p>Name: {formData?.firstname} {formData?.lastname}</p>
            <p>Phone Number: {formData?.phonenumber}</p>
            <p>Email: {formData?.email}</p>
            <p>Gender: {formData?.gender}</p>
            <p>Subjects: {formData?.subjects.length>0 && formData?.subjects.join(',')}</p>
          </li>
        ))}
      </ul> */}

      
      <DevTool control={form.control} />
        </>


  )
}
