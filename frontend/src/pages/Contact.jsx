import React, { useState } from "react";


const Contact = () => {
  

 
  setTimeout(() => {
    setIsLoading(false); 
  }, 3000);

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    const form = event.target;
    
    
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: form.username.value,
          email: form.email.value,
          phoneNumber: form.phoneNumber.value,
          howDidYouFindUs: form.howDidYouFindUs.value
        })
      });

      if (response.ok) {
        alert('Form submitted successfully!');
        
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Form submission failed');
    }
  };

 

  return (
    <div className="bg-green-100 w-full h-screen flex justify-center items-center">
      <div className="bg-slate-300 w-3/5 h-5/6 rounded-2xl">
        <div className="w-4/6 h-full bg-white rounded-l-lg flex flex-col items-center pt-5">
          <h1 className="text-3xl font-semibold">
            Get in <span className="text-red-400">Touch</span>
          </h1>
          <p className="text-md font-semibold mt-2">
            Get in touch with our newly formed platform
          </p>
          <form className="flex flex-col gap-4 w-[85%] mt-8" onSubmit={handleSubmit} action="https://formspree.io/f/myyrowyr" method="POST">
            <input
              className="bg-slate-200 h-10 rounded-2xl pl-4"
              type="text"
              placeholder="Name"
              name="username"
              required 
            />
            <input
              className="bg-slate-200 h-10 rounded-2xl pl-4"
              type="email"
              placeholder="Email"
              name="email"
              required 
            />
            <input
              className="bg-slate-200 h-10 rounded-2xl pl-4"
              type="tel"
              placeholder="Phone number"
              name="phoneNumber"
              required 
            />
            <select className="bg-slate-200 h-10 rounded-2xl pl-4 " name="howDidYouFindUs" required>
              
              <option value="">How did you find us</option><img src="expand.png" className="w-4 h-4" alt="Dropdown Arrow"  />
              <option value="LinkedIn">LinkedIn</option>
              <option value="Instagram">Instagram</option>
              <option value="Facebook">Facebook</option>
              <option value="Other">Other</option>
            </select>
            
            <button
              className="w-full h-10 bg-slate-300 mt-6 rounded-2xl hover:green-400"
              type="submit"
            >
              Submit
            </button>
          </form>
          <div className="w-full flex mt-8 justify-center gap-10 items-center">
            <div className="flex flex-col w-40">
              <img className="w-12 h-14" src="Phone.png" alt="" />
              <p className="pl-1">Mail</p>
              <a href="mailto:baruaranab12@gmail.com" className="text-blue-500 pl-1">mydemon@gmail.com</a>
            </div>
            <div className="flex flex-col w-40 text-right items-end">
              <img className="w-8 pt-1 h-10 mb-3 mr-7" src="email.png" alt="" />
              <p>Call us at</p> <a href="tel:99999999" className="text-blue-500">9999999</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

