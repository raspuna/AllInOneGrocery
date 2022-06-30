import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";


const UpdateItem = (props) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([]);
  const [skills2, setSkills2] = useState([]);
  const [skills3, setSkills3] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const preventD = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/pet/${id}`)
      .then((res) => {
        console.log(res.data.queriedOne);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateHandler = () => {
    axios
      .put(`http://localhost:8000/api/pet/${id}`)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <header>
        <div className="test-this">
          <h1>Pet Shelter</h1>
          <Link to="/">back to home</Link>
        </div>
        <h3>Edit Pet</h3>
      </header>
      <form onSubmit={preventD}>
        <div>
          <label>Pet Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Pet Type:</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div>
          <label>Pet Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Skill 1:</label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>
        <div>
          <label>Skill 2:</label>
          <input
            type="text"
            value={skills2}
            onChange={(e) => setSkills2(e.target.value)}
          />
        </div>
        <div>
          <label>Skill 3:</label>
          <input
            type="text"
            value={skills3}
            onChange={(e) => setSkills3(e.target.value)}
          />
        </div>
        <button onClick={updateHandler}> Add Item</button>
      </form>
    </div>
  );
};

export default UpdateItem;
