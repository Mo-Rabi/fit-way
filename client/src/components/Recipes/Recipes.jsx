import React, { useState } from "react";
import styles from './Recipes.module.css'
import axios from "axios";
import f18 from '../assets/images/recipes/f18.jpg'
import f17 from '../assets/images/recipes/f17.jpg'
import image from '../assets/account/bg.png'

export default function Recipes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = process.env.REACT_APP_API_KEY;

  const handleSearch = () => {
    axios.get(`https://api.api-ninjas.com/v1/recipe?query=${searchTerm}`, {
      headers: { 'x-api-key': apiKey }
    })
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error(error);
        setRecipes([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      <div className="container text-light">
        <div className="row justify-content-center">
          <h4 className="text-center text-light">Search for any recipe you like</h4>
          <div className={`text-center mt-3 pt-2 ${styles.subscribeForm}`}>
            <form className={`${styles.searchForm}`}>
              <input
                type="text"
                id={`${styles.ingredient}`}
                name="recipe"
                className="rounded-pill bg-white-50 border"
                placeholder="Please enter recipe name"
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
            {recipes && recipes.length === 0 && !isLoading && (
              <p style={{ color: 'red' }}>No recipes found. Please search for one.</p>
            )}
          </div>
        </div>
        
          {recipes && recipes.length > 0 && (
            <div className="row text-dark mt-3">
              {recipes.map((recipe, index) => (
                <div className="col-lg-4" key={index}>
                  <button
                    type="button"
                    className="btn mb-1 w-100 shadow-md"
                    data-bs-toggle="modal"
                    data-bs-target={`#staticBackdrop-${index}`}
                  >
                    {recipe.title}
                  </button>
                  <div className="modal fade" id={`staticBackdrop-${index}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={`staticBackdropLabel-${index}`} aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                      <div className="modal-content text-dark bg-light">
                        <div className="modal-header">
                          <h6 className="modal-title fs-5" id={`staticBackdropLabel-${index}`}> <i class="fa-solid fa-utensils"></i>  {recipe.title.toUpperCase()}</h6>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <p><i class="fa-solid fa-bowl-rice"></i> <span style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Servings:</span> {recipe.servings}</p>
                          <p><i class="fa-solid fa-pepper-hot"></i> <span style={{ textDecoration: 'underline', fontWeight: 'bold' }}> Ingredients:</span> {recipe.ingredients}</p>
                          <p><span style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Lets cook together:</span> {recipe.instructions}</p>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
    </>
  )
}