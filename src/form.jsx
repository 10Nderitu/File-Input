import React, { useState, useEffect } from "react";

function Form() {
  const [formData, setFormData] = useState({})
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("src/assets/org.jpg");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      if (name === "profile_picture") {
        const selectedFile = files[0];
        setFile(selectedFile);
        const fileReader = new FileReader();
        fileReader.onload = () => {
          setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(selectedFile);
      } else {
        setFile(files[0]);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData();
    
    // Append text field
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        data.append(key, formData[key]);
      }
    }
    // Append file
    if (file) {
      data.append("file", file);
    }

    const url = "http://localhost:5000/upload";
    fetch(url, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg mx-auto text-center">
        <h2 className="text-5xl font-semibold">Profile Picture</h2>
        <div className="flex justify-center">
          <div>
            <img 
              src={previewUrl}
              style={{width: '60px', height: '60px', borderRadius: '50%'}} 
              className="mx-auto mb-2"
            />
          
            <br/>
            <input
              type="file"
              id="profile-picture"
              name="profile_picture"
              onChange={handleChange}
              className="hidden"
              accept="image/*"
            />
          </div>
        </div>
        
        <p>Enter your details</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="input-box">
            <input
              type="text"
              placeholder="Name"
              name="name"
              required
              onChange={handleChange}
              className="border border-black rounded-md p-2 w-full"
            />
          </div>

          <div className="input-box">
            <input
              type="text"
              placeholder="Email"
              name="email"
              required
              onChange={handleChange}
              className="border border-black rounded-md p-2 w-full"
            />
          </div>

          <div className="input-box">
            <input
              type="text"
              placeholder="Phone Number"
              name="phoneNumber"
              required
              onChange={handleChange}
              className="border border-black rounded-md p-2 w-full"
            />
          </div>

          <p>Attach your documents below</p>

          <div className="input-box">
            <input
              type="file"
              placeholder="Name"
              name="file"
              required
              onChange={handleChange}
              className="border border-black rounded-md p-2 w-full"
            />
          </div>
          <div className="input-box">
            <input
              type="file"
              placeholder="Name"
              name="file"
              required
              onChange={handleChange}
              className="border border-black rounded-md p-2 w-full"
            />
          </div>
          <br/>

          <button
            type="submit"
            className="bg-black text-white px-20 py-2 rounded-md w-full"
          >Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Form;