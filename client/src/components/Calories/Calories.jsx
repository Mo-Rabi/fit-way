import React, { useState } from "react";
import axios from 'axios';
import '../assets/css/bootstrap-dark.min.css'
import styles from './Calories.module.css';
export default function Calories() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = "Ny0YaI88MFGFNlJDzpkCMZ3FJcBcV5KbBuY3wLyn";

  const fetchCaloriesData = async () => {
  const apiUrl = `https://api.api-ninjas.com/v1/nutrition`;

    try {
      setIsLoading(true)
      setError(null);
      const response = await axios.get(apiUrl, {
        params: { query: searchTerm },
        headers: { 'x-api-key': apiKey }
      });
      setData(response.data);
    } catch (err) {
      setError(err);
      setIsLoading(false)
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchTerm) {
      fetchCaloriesData();
    } else {
      return ''
    }
  };

  return (
    <>
      <div className="container text-light">
      <div className="row justify-content-center">
        <h4 className="text-center text-light">Enter food name to get macronutrients Information for each 100 gm</h4>
        <div className={`text-center mt-3 pt-2 ${styles.subscribeForm}`}>
          <form className={`${styles.searchForm}`}>
            <input
              type="text"
              id={`${styles.ingredient}`}
              name="ingredient"
              className="rounded-pill bg-white-50 border"
              placeholder="Please enter ingredient name"
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
          {data && data.length === 0 && !isLoading && (
            <p style={{ color: 'red' }}>No ingredients found. Please search for one.</p>
          )}

        </div>
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="table-responsive mb-3 shadow-md rounded">
                
                  {data && data.length > 0 && (
                    <table className="table mb-0 table-center table-primary">
                    <thead>
                      <tr className="text-center text-light">
                        <th scope="col" className="fw-normal border-bottom py-4 px-1" style={{ width: 130 }}><i className="fa-solid fa-bowl-food"></i> Ingredient</th>
                        <th scope="col" className="fw-normal border-bottom py-4 px-1" style={{ width: 100 }}><i className="fa-solid fa-bolt"></i> Calories (kcal)</th>
                        <th scope="col" className="fw-normal border-bottom py-4 px-1" style={{ width: 100 }}><i className="fa-solid fa-dna"></i> Protein (gm)</th>
                        <th scope="col" className="fw-normal border-bottom py-4 px-1" style={{ width: 100 }}><i className="fa-solid fa-bacon"></i> Fat (gm)</th>
                        <th scope="col" className="fw-normal border-bottom py-4 px-0" style={{ width: 120 }}><i className="fa-solid fa-bread-slice"></i> Carbohydrates (gm)</th>
                        <th scope="col" className="fw-normal border-bottom py-4 px-0" style={{ width: 100 }}><i className="fa-solid fa-cubes-stacked"></i> Sugar (gm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr className="text-center" key={index}>
                          <td className="p-3">{item.name ? item.name.toUpperCase() : ''}</td>
                          <td className="p-3">{item.calories}</td>
                          <td className="p-3">{item.protein_g}</td>
                          <td className="p-3">{item.fat_total_g}</td>
                          <td className="p-3">{item.carbohydrates_total_g}</td>
                          <td className="p-3">{item.sugar_g}</td>
                        </tr>
                      ))}
                    </tbody>
                    </table>
                    
                  )}
                </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
