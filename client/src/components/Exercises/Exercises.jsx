import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from './Exercises.module.css'

export default function Exercises() {
  const [searchTerm, setSearchTerm] = useState("");
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    axios
      .get(`http://localhost:4000/user/getExercise?muscle=${searchTerm}`)
      .then((response) => {
        setExercises(response.data);
      })
      .catch((error) => {
        console.error(error);
        setExercises([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="container text-light">
        <h4 className="text-center text-light ">Enter the name of the muscle you want to exercise today</h4>
        <div className={`text-center mt-3 pt-2 ${styles.subscribeForm}`}>
          <form className={`${styles.searchForm}`}>
            <input
              type="text"
              id={`${styles.ingredient}`}
              name="ingredient"
              className="rounded-pill bg-white-50 border"
              placeholder="Please enter muscle name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="button"
              className={`btn rounded-pill btn-primary ${styles.searchBtn}`}
              onClick={handleSearch}
            >
              {isLoading ? <i className='fa fa-spin fa-spinner'></i> : <><i className='fa fa-search'></i> Search </>}
            </button>
          </form>
        {exercises.length === 0 && !isLoading && (
          <p style={{ color: "red" }}>No exercises found. Please search for a muscle.</p>
        )}
      </div>
      <div className="row text-dark mt-3" >
        {exercises.map((exercise) => (

          <div className="col-lg-4 col-sm-12" key={exercise._id}>
            <button
              type="button"
              className={`btn mb-3 w-100 ${styles.resultBtn} `}
              data-bs-toggle="modal"
              data-bs-target={`#exerciseModal-${exercise._id}`}
            >
              {exercise.name.toUpperCase()}
            </button>
            <div
              className="modal fade"
              id={`exerciseModal-${exercise._id}`}
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby={`exerciseModalLabel-${exercise._id}`}
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content bg-light text-dark">
                  <div className="modal-header">
                    <h6 className="modal-title fs-5" id={`exerciseModalLabel-${exercise._id}`}>
                      <i className="fa-solid fa-person-running"></i> {exercise.name.toUpperCase()}
                    </h6>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <p>
                      <i className="fa-solid fa-star"></i>{" "}
                      <span style={{ textDecoration: "underline", fontWeight: "bold" }}> Type:</span> {exercise.type}
                    </p>
                    <p>
                      <i className="fa-solid fa-hand-fist"></i>{" "}
                      <span style={{ textDecoration: "underline", fontWeight: "bold" }}> Difficulty:</span> {exercise.difficulty}
                    </p>
                    <p><i className="fa-solid fa-dumbbell"></i>{" "}
                      <span style={{ textDecoration: 'underline', fontWeight: 'bold' }}> Equipment needed:</span> {exercise.equipment}
                    </p>
                    <p>
                      <span style={{ textDecoration: "underline", fontWeight: "bold" }}>Follow these instructions:</span>{" "}
                      {exercise.instructions}
                    </p>
                    <h5><i class="fa-brands fa-youtube"></i> Here is a video to explain more</h5>
                    <iframe src={exercise.videoURL} title="Exercise Video" width="100%" height="360" allowFullScreen></iframe>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}