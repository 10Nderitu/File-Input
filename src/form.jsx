import React, { useState } from "react";

function Form() {
  const [formData, setFormData] = useState({})

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFile(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData();
    // Append text fields
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
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg mx-auto">
        <h2 className="text-5xl font-semibold text-center">Profile Picture</h2>
        <div className="flex justify-center">
          <label htmlFor="profile-picture" className="cursor-pointer">
            {/* {profilePicturePreview ? (
              <img
                // src={profilePicturePreview}
                alt="Profile Picture"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            )} */}
          </label>
          <input
            type="file"
            id="profile-picture"
            name="profile_picture"
            // onChange={handleProfilePictureChange}
            className="hidden"
          />
        </div>
        <p className="text-center">Enter your details</p>

        <form onSubmit={handleSubmit}>
          <div className="input-box mb-4">
            <input
              type="text"
              placeholder="Name"
              name="name"
              required
              onChange={handleChange}
              className="border border-black rounded-md p-2 w-full"
            />
          </div>
          <div className="input-box mb-4">
            <input
              type="file"
              placeholder="Name"
              name="file"
              required
              onChange={handleChange}
              className="border border-black rounded-md p-2 w-full"
            />
          </div>

          <div className="input-box mb-4">
            <input
              type="text"
              placeholder="Email"
              name="email"
              required
              onChange={handleChange}
              className="border border-black rounded-md p-2 w-full"
            />
          </div>

          <div className="input-box mb-4">
            <input
              type="text"
              placeholder="Phone Number"
              name="phoneNumber"
              required
              onChange={handleChange}
              className="border border-black rounded-md p-2 w-full"
            />
          </div>

          {/* <p>Attach your documents below</p>
          <input type="file" name="file" onChange={handleFile} className="mb-4" />
          <br />
          <br /> */}

          <button
            type="submit"
            className="bg-black text-white px-20 py-2 rounded-md w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
