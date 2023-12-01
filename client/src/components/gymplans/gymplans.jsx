import React, { useEffect, useRef, useState } from 'react'
import style from './gymplans.module.css'
import axios from 'axios';
import ReactCardFlip from 'react-card-flip';

export default function Gymplans() {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef();

  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handler = () => {
    const text = inputRef.current.value;
    const newItem = { Completed: false, text }
    setTodos([...todos, newItem]);
    inputRef.current.value = ""
  }
  const handelItemDone = (index) => {
    const newToDos = [...todos];
    newToDos[index].Completed = !newToDos[index].Completed;
    setTodos(newToDos)
    console.log(newToDos)
  }
  const handelDeleteItem = (index) => {
    const newToDos = [...todos];
    newToDos.splice(index, 1);
    setTodos(newToDos)
  }

  const [filp, setFlip] = useState(false)
  const [gif, getGifExercises] = useState([])



  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://exercisedb.p.rapidapi.com/exercises',
        params: { limit: '10' },
        headers: {
          'X-RapidAPI-Key': 'f9dd725c93msh0bc7a1528d1187bp17edf3jsn0a9d65571d92',
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);
        console.log(response.data);
        getGifExercises(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);







  return (

    <>
      <div className={style.maincontainer} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', backgroundImage: `url('https://t4.ftcdn.net/jpg/04/61/47/03/360_F_461470323_6TMQSkCCs9XQoTtyer8VCsFypxwRiDGU.jpg')`, backgroundPosition: 'center', minHeight: '100vh'}}>
        {/*<div className='d-flex  flex-wrap'>
{biceps.slice(0, 2).map((item)=>(
  <div key={item.id} className="card" style={{width: '18rem'}}>
  <img src="..." className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{item.muscle}</h5>
    <p className="card-text">{item.equipment}</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
</div>

))}
</div>*/}






        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
          {/* Front of the card */}
          <div className="card-front" onClick={handleClick}>
            <div className="chestcontainer d-flex">
              <div className="card mb-3" style={{ maxWidth: 540, height: 203 }}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src="https://media.istockphoto.com/id/1126903494/photo/a-young-handsome-man-doing-strength-workout-exercise-in-gym.webp?b=1&s=170667a&w=0&k=20&c=jivkCkjjORHPwjbtV9C2FljZau3BG7RE78nHRZOy0Tg="
                      className="img-fluid rounded-start h-100 rounded-circle"
                      alt="..."
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title text-primary">Chest in the gym</h5>
                      <ol>
                        <li>Bench press builds chest strength</li>
                        <li>Incline press targets upper chest.</li>
                        <li>Chest flyes isolate chest muscles.</li>
                        <li>Cable crossovers shape chest nicely.</li>                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Back of the card */}
          <div className="card-back" onClick={handleClick}>
            <div className="card mb-3" style={{ maxWidth: 540, height: 203 }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src="https://www.muscleandfitness.com/wp-content/uploads/2018/07/1109-home-workout0.jpg?quality=86&strip=all"
                    className="img-fluid rounded-start h-100 rounded-circle"
                    alt="..."
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body " >
                    <h5 className="card-title text-primary">Chest in the gym</h5>
                    <ol>
                      <li>Push-ups for chest at home.</li>
                      <li>Decline push-ups target upper chest.</li>
                      <li>Dumbbell chest press, floor-based.</li>
                      <li>Wide-arm push-ups engage chest.</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ReactCardFlip>



        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
          {/* Front of the card */}
          <div className="card-front" onClick={handleClick}>
            <div className="chestcontainer d-flex">
              <div className="card mb-3" style={{ maxWidth: 540, height: 225 }}>
                <div className="row g-0">
                  <div className="col-md-4" style={{}}>
                    <img
                      src="https://steelsupplements.com/cdn/shop/articles/shutterstock_657941434_376ae0c9-1a39-42d3-bc39-3eaf18d5038f_600x.jpg?v=1641548776"
                      className="img-fluid rounded-start h-100 rounded-circle"
                      alt="..."
                      style={{ width: '100%', height: 'auto' }}
                    />              </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title text-primary">Biceps in the gym</h5>
                      <ol>
                        <li>Barbell curls build bicep strength.</li>
                        <li>Hammer curls work biceps nicely.</li>
                        <li>Preacher curls target bicep muscles.</li>
                        <li>Concentration curls isolate biceps effectively</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Back of the card */}
          <div className="card-back" onClick={handleClick}>
            <div className="card mb-3" style={{ maxWidth: 540, height: 203 }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src="https://cdn.muscleandstrength.com/sites/default/files/images/articles/chinups_for_arm_muscles.jpg"
                    className="img-fluid rounded-start h-100 rounded-circle"
                    alt="..."
                    style={{ width: '100%', height: 'auto' }}
                  />            </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title text-primary">Biceps in the home</h5>
                    <ol>
                      <li>Push-ups engage biceps at home</li>
                      <li>Dumbbell curls, home bicep workout</li>
                      <li>Chin-ups, great for bicep development.</li>
                      <li>Resistance band curls, home option</li>
                      <li>Towel curls, creative bicep exercise.</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ReactCardFlip>

        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
          {/* Front of the card */}
          <div className="card-front" onClick={handleClick}>
            <div className="chestcontainer d-flex">
              <div className="card mb-3" style={{ maxWidth: 540, height: 225 }}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src="https://blogscdn.thehut.net/wp-content/uploads/sites/478/2018/05/11115302/triceps-dip-min.jpg"
                      className="img-fluid rounded-start h-100 rounded-circle"
                      alt="..."
                      style={{ width: '100%', height: 'auto' }}
                    />                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title text-primary">Tricep  in the gym</h5>
                      <ol>
                        <li>Tricep dips build arm strength</li>
                        <li>Close-grip bench press targets triceps</li>
                        <li>Tricep pushdowns work arm muscles</li>
                        <li>Skull crushers isolate triceps effectively</li>
                        <li>Overhead extensions strengthen triceps nicely</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Back of the card */}
          <div className="card-back" onClick={handleClick}>
            <div className="card mb-3" style={{ maxWidth: 540, height: 225 }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src="https://img.livestrong.com/-/clsd/getty/95715babdffa4e769ada80f2c759327a.jpg"
                    className="img-fluid rounded-start h-100 rounded-circle"
                    alt="..."
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>

                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title text-primary">Tricep in the home</h5>
                    <ol>
                      <li>Chair dips engage triceps well</li>
                      <li>Diamond push-ups isolate triceps</li>
                      <li>Resistance bands for tricep workouts</li>
                      <li>Tricep kickbacks with dumbbells</li>
                      <li>Tricep overhead extensions with household items</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ReactCardFlip>
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
          {/* Front of the card */}
          <div className="card-front" onClick={handleClick}>
            <div className="chestcontainer d-flex">
              <div className="card mb-3" style={{ maxWidth: 540, height: 260 }}>
                <div className="row g-0">
                  <div className="col-md-4" style={{ height: 260 }}>
                    <img
                      src="https://myxperiencefitness.com/wp-content/uploads/2020/07/back-main-image.jpg"
                      className="img-fluid rounded-start h-100 rounded-circle"
                      alt="..."
                      style={{ width: '100%', height: '100%', }}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title text-primary">Back in the gym</h5>
                      <ol>
                        <li>Deadlifts strengthen the entire back effectively.</li>
                        <li>Pull-ups work upper back muscles intensely</li>
                        <li>Rows target mid-back and lats.</li>
                        <li>Lat pulldowns for broad back development.</li>
                        <li>Face pulls improve upper back posture</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Back of the card */}
          <div className="card-back" onClick={handleClick}>
            <div className="card mb-3" style={{ maxWidth: 540, height: 225 }}>
              <div className="row g-0">
                <div className="col-md-4" style={{ height: 225 }}>
                  <img
                    src="https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_375,q_auto:eco,dpr_2,f_auto,fl_progressive/image/diy/f5332b0b-253a-416c-9266-2d19ddd4224e.jpg"
                    className="img-fluid rounded-start h-100 rounded-circle"
                    alt="..."
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title text-primary">Back in the home</h5>
                    <ol>
                      <li>Superman exercise for lower back activation.</li>
                      <li>Bodyweight rows using a sturdy bar</li>
                      <li>Doorway pull-ups engage back muscles</li>
                      <li>Plank with row to work back</li>
                      <li>Resistance band rows for a home back workout effectively </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ReactCardFlip>
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
          {/* Front of the card */}
          <div className="card-front" onClick={handleClick}>
            <div className="chestcontainer d-flex">
              <div className="card mb-3" style={{ maxWidth: 540, height: 225 }}>
                <div className="row g-0">
                  <div className="col-md-4" style={{ height: 225 }}>
                    <img
                      src="https://global-uploads.webflow.com/5f517d45532327f0210280dc/60d6002ddc91a45f41743e7c_Untitled%20design%20(10).png"
                      className="img-fluid rounded-start h-100 rounded-circle"
                      alt="..."
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title text-primary">Shoulder in the gym</h5>
                      <ol>
                        <li>Military press builds shoulder strength</li>
                        <li>Dumbbell lateral raises for broad shoulders</li>
                        <li>Upright rows target shoulder muscles</li>
                        <li>Face pulls improve shoulder posture</li>
                        <li>Arnold presses enhance overall shoulder development</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Back of the card */}
          <div className="card-back" onClick={handleClick}>
            <div className="card mb-3" style={{ maxWidth: 540, height: 220 }}>
              <div className="row g-0">
                <div className="col-md-4" style={{ height: 220 }}>
                  <img
                    src="https://www.mensjournal.com/.image/t_share/MTk2MTM2NDUyMzIwNTM1Njk3/1280-shoulder-raise.jpg"
                    className="img-fluid rounded-start h-100 rounded-circle"
                    alt="..."
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title text-primary">Shoulder in the home</h5>
                    <ol>
                      <li>Bodyweight shoulder presses for home workout.</li>
                      <li>Bodyweight rows using a sturdy bar</li>
                      <li>Lateral raises using household items</li>
                      <li>Resistance band exercises for shoulder strength</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ReactCardFlip>


      </div>


      {/*to do list */}

      <div className={style.todoContainer} style={{ backgroundImage: `url('https://t4.ftcdn.net/jpg/04/61/47/03/360_F_461470323_6TMQSkCCs9XQoTtyer8VCsFypxwRiDGU.jpg')` }}>        <h2 className='text-light'>To Do List</h2>
        <ol  className={style.liToDoList}>
          {todos.map(({ text, Completed }, index,) => {
            return (<div className={style.listContainer}><li onClick={() => handelItemDone(index)} className={Completed ? "text-decoration-line-through  " : ""} key={index}>{text}</li>
              <span onClick={() => handelDeleteItem(index)} >❌</span></div>)
          })}
        </ol>
        <input className={style.inputTask} type="text" ref={inputRef} placeholder='Enter the exercise' />
        <button onClick={handler} className='btn btn-primary'>Add</button>

      </div>
      <div>
        <span className='text-capitalize fs-3 text-primary position-relative top-0 ps-3 translate-middle'>warm-up exercises</span>

      </div>


      <div style={{
        flexWrap: 'wrap', height: "auto",
        display: 'flex',
      }} className="showExercises">

        {gif.map((data) => (
          <div key={data.id}>
            <div className="card" style={{ width: '18rem' }}>
              <img src={data.gifUrl} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title text-primary">{data.bodyPart}</h5>
                <p className="card-text">{data.equipment}</p>

              </div>
            </div>
          </div>
        ))}
      </div>

    </>
  )
}

