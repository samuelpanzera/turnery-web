import { useEffect, useState } from "react";
import api from "../../services/api";

import { Slider } from "../../components/sliders/slider";

interface modelFilmes {
  id: number;
  title: string;
  poster_path: string;
}

function Home() {
  const [filmes, setFilmes] = useState<Array<modelFilmes>>([]);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("/movie/now_playing", {
        params: {
          api_key: "f9c58a93d70fa8f301b9bbbd836ef8d4",
          language: "pt-BR",
          page: 1,
        },
      });

      setFilmes(response.data.results.slice(0, 10));
    }

    loadFilmes();
  }, []);

  return <Slider filmes={filmes} />;
}

export default Home;
