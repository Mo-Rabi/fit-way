import React, { useState, useEffect } from "react";
import styles from "./Trainers.module.css";
import team1 from "../assets/images/gym/team1.jpg";
import team2 from "../assets/images/gym/team2.jpg";
import team3 from "../assets/images/gym/team3.jpg";
import team4 from "../assets/images/gym/team4.jpg";
import bg from "../assets/images/gym/bg2.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Trainers() {
  //? Navigate to trainer profile
  const navigate = useNavigate();

  //! Add to favorites
  // Initialize favorites from local storage or an empty array
  const initialFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const [favorites, setFavorites] = useState(initialFavorites);

  const toggleFavorite = (trainerId) => {
    // Check if the trainer is already in favorites
    if (favorites.includes(trainerId)) {
      // Remove trainer ID from favorites
      const updatedFavorites = favorites.filter((id) => id !== trainerId);
      setFavorites(updatedFavorites);
    } else {
      // Add trainer ID to favorites
      const updatedFavorites = [...favorites, trainerId];
      setFavorites(updatedFavorites);
    }
  };

  // Save favorites to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  //! Retrieve All Trainers
  const allTrainerDataQuery = useQuery({
    queryKey: ["allTrainersData"],
    queryFn: async () => {
      let { data } = await axios.get("http://localhost:4000/trainers");
      const trainers = data.viewAllTrainers;
      return trainers;
    },
  });
  if (allTrainerDataQuery.isLoading) return <h1>Loading...</h1>;
  if (allTrainerDataQuery.isError)
    return <pre>{JSON.stringify(allTrainerDataQuery.error)}</pre>;

  return (
    <div
      className="row p-5"
      style={{
        background: `url(${bg})`,
      }}
    >
      {allTrainerDataQuery.data.map(
        (trainer, index) => (
          console.log(trainer, index),
          (
            <div key={index} className="col-lg-3 col-md-6 px-4 mt-5 mt-5">
              <div className="card team team-primary text-center bg-transparent border-0">
                <div className="card-body p-0">
                  <div className="">
                    <div className="position-relative">
                      <img
                        src={trainer.picture}
                        className="img-fluid rounded"
                      />
                      <div
                        className="position-absolute top-0 translate-middle mt-2"
                        style={{ marginLeft: "90%" }}
                      >
                        <FontAwesomeIcon
                          icon={faHeart}
                          className="position-absolute mt-2 start-100 translate-middle"
                          style={{
                            color: favorites.includes(trainer._id)
                              ? "#ff0000"
                              : "#828282",
                            cursor: "pointer",
                          }}
                          onClick={() => toggleFavorite(trainer._id)}
                        />
                      </div>
                    </div>
                    <div className=" mb-0 team-icon text-white">
                      <p> {trainer.description}</p>
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          navigate(`/trainer/profile/${trainer._id}`)
                        }
                      >
                        View profile
                      </button>
                    </div>
                  </div>
                  <div className="content pt-3 pb-3">
                    <h5 className="mb-0">
                      <a href="" className="name">
                        {trainer.firstName} {trainer.lastName}
                      </a>
                    </h5>
                    <small className="designation text-muted">
                      {trainer.title}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          )
        )
      )}
      {/*end col*/}
    </div>
  );
}
