import { useState } from "react";
import axios from "axios";

export default function FormComponent() {
  //explicit typing for our usestates
  const [preview, setPreview] = useState<string>("");
  //store the prediction from the backend call
  const [prediction, setPrediction] = useState<string>("");
  const [error, setError] = useState<string>("");

  //our frontend to backend script for image data
  const handleUpload = async (file: File) => {
    try {
      //have to create formdata like in the backend
      const formData = new FormData();
      formData.append("file", file);
      //use route to await data and get predicition
      const { data } = await axios.post(
        "http://localhost:8080/predict",
        formData
      );
      setPrediction(data.breed);
      setError("");
    } catch (err) {
      setError("Failed to predict breed");
      setPrediction("");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
      handleUpload(file);
    } else {
      setError("Please select an image file");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {preview && (
        <div>
          <img
            src={preview}
            alt="Uploaded"
            style={{ maxWidth: "300px", marginTop: "20px" }}
          />
        </div>
      )}

      {prediction && (
        <div style={{ marginTop: "20px" }}>
          <h3>Predicted Breed: {prediction}</h3>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
