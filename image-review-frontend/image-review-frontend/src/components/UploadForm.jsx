import { useState } from "react";

function UploadForm() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please choose a photo to upload!");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:9999/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Upload Image Success!");
      } else {
        setMessage("Error: " + data.error);
      }
    } catch (err) {
      setMessage("Connect to server failed!");
    }
  };

  return (
    <div>
      <h1>Upload Image</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Upload</button>
        <div>{message}</div>
      </form>
    </div>
  );
}

export default UploadForm;
