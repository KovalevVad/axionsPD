import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './app.css';
import img from './img/heart.svg';
import img1 from './img/heartRed.svg';

const src = 'https://api.thecatapi.com/v1/images/search?limit=10';

function App() {
  const [appState, setAppState] = useState([]);

  useEffect(() => {
    axios.get(src).then((resp) => {
      const catsWithLikes = resp.data.map((cat) => ({
        id: cat.id,
        url: cat.url,
        liked: false,
      }));
      setAppState(catsWithLikes);
    });
  }, []);

  const toggleLike = (index) => {
    setAppState((prevAppState) => {
      const newState = [...prevAppState];
      newState[index] = { ...newState[index], liked: !newState[index].liked };
      return newState;
    });
  };

  return (
    <section>
      {appState.map((item, index) => {
        return (
          <div className='card' key={item.id}>
            <img src={item.url} alt='Cat'></img>
            <img
              src={item.liked ? img1 : img}
              alt='Like'
              onClick={() => toggleLike(index)}
            ></img>
          </div>
        );
      })}
    </section>
  );
}

export default App;
