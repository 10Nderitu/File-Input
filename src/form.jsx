import React, { useState } from "react";

function Form() {
  const [file, setFile] = useState();
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  function handleFile(event) {
    setFile(event.target.files[0]);
  }

  function handleProfilePictureChange(event) {
    setProfilePicture(event.target.files[0]);
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicturePreview(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
console.log("hello")
    // Create a FormData object to handle file uploads
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('file', file);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    try {
      const response = await fetch('https://your-api-endpoint.com/submit', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Data submitted successfully:', result);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg mx-auto">
        <h2 className="text-5xl font-semibold text-center">Profile Picture</h2>
        <div className="flex justify-center">
          <label htmlFor="profile-picture" className="cursor-pointer">
            {profilePicturePreview ? (
              <img
                src={profilePicturePreview}
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
            )}
          </label>
          <input
            type="file"
            id="profile-picture"
            onChange={handleProfilePictureChange}
            className="hidden"
          />
        </div>
        <p className="text-center">Enter your details</p>

        <form onSubmit={handleSubmit}>
          <div className="input-box mb-4">
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-black rounded-md p-2 w-full"
            />
          </div>

          <div className="input-box mb-4">
            <input
              type="text"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-black rounded-md p-2 w-full"
            />
          </div>

          <div className="input-box mb-4">
            <input
              type="text"
              placeholder="Phone Number"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-black rounded-md p-2 w-full"
            />
          </div>

          <p>Attach your documents below</p>
          <input type="file" name="file" onChange={handleFile} className="mb-4" />
          <br />
          <br />

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
