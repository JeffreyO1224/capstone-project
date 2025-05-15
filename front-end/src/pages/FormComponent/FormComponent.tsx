import axios from "axios";
import { useEffect, useState } from "react";
import { setKey, fromLatLng } from "react-geocode";
import { useAuth } from "../../App";
import "./FormComponent.css";

setKey(import.meta.env.VITE_GOOGLE_API_KEY);

export default function FormComponent({closeModal, locationCoordinates}) {
  //for now, these will be self contained use states
  //later when we put everything together, these will be props passed down
  //from the map page to make a database post
  //the map page will also provide the coordinates
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [petName, setPetName] = useState("");
  const [breed, setBreed] = useState("");
  const [location, setLocation] = useState("");
  //this will be used later when we can implement location to coordinates
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  var { userName } = useAuth().user;
  if (!userName) userName = "";

  //populate the coordinates with information from the map page
  useEffect(() => {
    if (locationCoordinates) {
      setCoordinates({
        lat: locationCoordinates.lat,
        lon: locationCoordinates.lng,
      });

      async function coordsToAddress(coordinates) {
        if (!coordinates) return

        try {
          const { results } = await fromLatLng(coordinates.lat, coordinates.lng);
          setLocation(results[0].formatted_address);
        } catch {
          console.log("Error: Something went wrong!");
        }
      }
      coordsToAddress(locationCoordinates);
    }
  }, [locationCoordinates])

  const handleUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await axios.post(
        "http://localhost:8080/predict",
        formData
      );
      //the breed will be prefilled based on the prediction, yet can be edited by the user if they disagree
      //with teh predicted breed
      setBreed(data.breed);
      setError("");
    } catch (err) {
      setError("Failed to predict breed");
      setBreed("");
    }
  };

  //function to display the image as a preview in the form, as well as upload the image
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith("image/")) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
      handleUpload(file);
    } else {
      setError("Please select an image file");
    }
  };

  //function for when our form is complete
  //will be completeled lader
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !petName || !breed || !location) {
      setError("Please fill all required fields");
      return;
    }

    try {
      //create an easy obj to post to our database
      const formData = new FormData();
      formData.append("image", file);
      formData.append("pet_name", petName);
      formData.append("breed", breed);
      formData.append("location", location);
      formData.append("user_name", userName );

      //Insert into database
      const response = await axios.post(
        "http://localhost:8080/post/createPost",
        formData
      );

      //const result = await response.json();
      console.log("Successfully submitted");
      setError("");
      resetForm();
    } catch (err) {
      console.error(err);
      setError("Failed to submit form");
    }
  };

  //clear the form, will probably not need later
  const resetForm = () => {
    setPreview("");
    setFile(null);
    setPetName("");
    setBreed("");
    setLocation("");
    setCoordinates(null);
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Report Missing Pet</h1>
      <form className="pet-form" onSubmit={handleSubmit}>
        <div className="image-upload-section">
          {!preview ? (
            <div className="file-input">
              <label className="upload-label">
                Upload Pet Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </label>
            </div>
          ) : (
            <div className="image-preview">
              <label className="upload-label">
                <img src={preview} alt="Uploaded" className="preview-image" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </label>
            </div>
          )}
        </div>

        <div className="form-fields">
          <div className="form-group">
            <label>Pet Name:</label>
            <input
              type="text"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              className="text-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Breed:</label>
            <input
              type="text"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              className="text-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Last Seen Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="text-input"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={() => { resetForm(); closeModal() }}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Submit Report
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
