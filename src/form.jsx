import React, { useState, useRef } from "react";

function Form() {
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState({
    profile_picture: null,
    file1: null,
    file2: null
  });
  const [previewUrl, setPreviewUrl] = useState("src/assets/org.jpg");
  
  // Create refs for file inputs
  const fileInputRefs = {
    profile_picture: useRef(null),
    file1: useRef(null),
    file2: useRef(null)
  };

  const handleChange = (e) => {
    const { name, value, type, files: uploadedFiles } = e.target;
    if (type === "file") {
      if (uploadedFiles.length > 0) {
        if (name === "profile_picture") {
          const selectedFile = uploadedFiles[0];
          setFiles(prev => ({ ...prev, [name]: selectedFile }));
          const fileReader = new FileReader();
          fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
          };
          fileReader.readAsDataURL(selectedFile);
        } else {
          setFiles(prev => ({ ...prev, [name]: uploadedFiles[0] }));
        }
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCancel = (name) => {
    setFiles(prev => ({ ...prev, [name]: null }));
    if (name === "profile_picture") {
      setPreviewUrl("src/assets/org.jpg");
    }
    // Reset the file input
    if (fileInputRefs[name].current) {
      fileInputRefs[name].current.value = "";
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData();
    
    // Append text fields
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    // Append files
    Object.entries(files).forEach(([key, file]) => {
      if (file) {
        data.append(key, file);
      }
    });

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
            <div className="flex items-center">
              <input
                type="file"
                id="profile-picture"
                name="profile_picture"
                onChange={handleChange}
                ref={fileInputRefs.profile_picture}
                className="hidden"
                accept="image/*"
              />
              
              {files.profile_picture && (
                <button
                  type="button"
                  onClick={() => handleCancel("profile_picture")}
                  className="bg-red-500 text-white px-2 py-1 rounded-md text-sm"
                >
                  ✕
                </button>
              )}
            </div>
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

          <div className="input-box flex items-center">
            <input
              type="file"
              placeholder="Name"
              name="file1"
              onChange={handleChange}
              ref={fileInputRefs.file1}
              className="border border-black rounded-md p-2 w-full"
            />
            {files.file1 && (
              <button
                type="button"
                onClick={() => handleCancel("file1")}
                className="bg-red-500 text-white px-2 py-1 rounded-md text-sm ml-2"
              >
                ✕
              </button>
            )}
          </div>

          <div className="input-box flex items-center">
            <input
              type="file"
              placeholder="Name"
              name="file2"
              onChange={handleChange}
              ref={fileInputRefs.file2}
              className="border border-black rounded-md p-2 w-full"
            />
            {files.file2 && (
              <button
                type="button"
                onClick={() => handleCancel("file2")}
                className="bg-red-500 text-white px-2 py-1 rounded-md text-sm ml-2"
              >
                ✕
              </button>
            )}
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