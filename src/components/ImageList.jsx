import { useEffect, useState } from "react";

function ImageList() {
  const [images, setImages] = useState([]);
  const [commentInput, setCommentInput] = useState({});

  useEffect(() => {
    fetch("https://image-be.onrender.com/api/images")
      .then((res) => res.json())
      .then(setImages);
  });

  const handleLike = (id) => {
    fetch(`https://image-be.onrender.com/api/images/${id}/like`, { method: "POST" });
    fetch("https://image-be.onrender.com/api/images")
      .then((res) => res.json())
      .then(setImages);
  };

  const handleComment = (id) => {
    const text = commentInput[id];
    if (!text) return;

    fetch(`https://image-be.onrender.com/api/images/${id}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    setCommentInput({...commentInput, [id]: ""});

    fetch("https://image-be.onrender.com/api/images")
      .then((res) => res.json())
      .then(setImages);
  };

  return (
    <div>
      <h1>Gallery</h1>
      {images.map((i) => (
        <div key={i._id}>
          <img src={i.secure_url} alt={i.originalname} width={200} />
          <button onClick={() => handleLike(i._id)}>Like {i.likes}</button>
          <ul>
            {i.comments.map((cmt, idx) => (
                <li key={idx}>{cmt.text}</li>
            ))}
          </ul>
          <input type="text" value={commentInput[i._id] || ""} onChange={(e) => setCommentInput({...commentInput, [i._id]: e.target.value})} placeholder="What do you think?" />
          <button onClick={() => handleComment(i._id)}>Send</button>
        </div>
      ))}
    </div>
  );
}

export default ImageList;
