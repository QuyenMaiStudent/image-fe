import { useRef, useState } from "react";

function UploadForm() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef();

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
      const res = await fetch("https://image-be.onrender.com/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Upload Image Success!");
        setFile(null);
        // Reset input value để có thể chọn lại cùng 1 file nếu muốn
        if (fileInputRef.current) fileInputRef.current.value = "";
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
        <label htmlFor="file-upload" className="custom-file-label">
          Chọn ảnh
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        <div className="file-name">
          {file ? file.name : "Vui lòng chọn ảnh"}
        </div>
        <button type="submit">Upload</button>
        <div>{message}</div>
      </form>
    </div>
  );
}

export default UploadForm;
