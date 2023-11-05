import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import FavPoke from "./component/FavPoke";

function App() {
  const [poke, setPoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [number, setNumber] = useState(1);
  const [fav, setFav] = useState([]);

  useEffect(() => {
    // เป็นตัว cancel req ป้องกันการเรียกซ้ำ
    let abortController = new AbortController();

    const loadPoke = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${number}`,
          {
            signal: abortController.signal,
          }
        );
        setPoke(res.data);
        setError("");
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError("Error in axios", error);
      }
    };
    loadPoke();

    return () => abortController.abort();
  }, [number]);
  // ใส่ number เพื่อในการรับ number / ต้องใส่ตรงนี้ function inClick ถึงจะทำงานกับ useEffect ได้
  // เมื่อมีการกด onClick และ function ทำงานทำให้มีการ update Number
  // และเมื่อ number มีการเปลี่ยนแปลง useEffect ก็จะมีการรันโค้ดข้างในใหม่ และจำทำให้ได้ค่าใหม่

  console.log(poke);

  const prevPoke = () => {
    setNumber((number) => number - 1);
  };
  const nextPoke = () => {
    setNumber((number) => number + 1);
  };

  const addFav = () => {
    // ทุกครั้งเวลาที่เรามีการเพิ่มจะเห็นได้ว่าทุกครั้งที่เพิ่มมันจะเก็บ state เก่าไว้ด้วย
    setFav((previosState) => [...previosState, poke]);
    // [...previosState, poke] เอา state เก่ามาเก็บค่าใหม่เพิ่มทำให้มีทั้งค่าเก่าและค่าใหม่
  };

  return (
    <div class="max-w-5xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {/* ถ้า poke มีค่าจริง ให้เข้าถึง name */}
            <div>
              <h1>{poke?.name}</h1>
              <button onClick={addFav}>Add to Favorite</button>
              <br />
              <img
                src={poke?.sprites?.other?.home.front_default}
                alt={poke?.name}
              />
              <ul>
                {poke?.abilities?.map((a, i) => (
                  <li key={i}>{a?.ability.name}</li>
                ))}
              </ul>
              <button onClick={prevPoke}>Previous</button>
              <button onClick={nextPoke}>Next</button>
            </div>
          </>
        )}

        <div>
          <h2>Your Favorite Pokemon</h2>

          <FavPoke fav={fav} />
        </div>
      </div>
    </div>
  );
}

export default App;
