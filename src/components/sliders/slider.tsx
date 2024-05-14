import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/swiper-bundle.css";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import "swiper/css/autoplay";

interface modelFilmes {
  id: number;
  title: string;
  poster_path: string;
}

interface movies {
  filmes: Array<modelFilmes>;
}

export const Slider = (movies: movies) => {
  const filmes = movies.filmes;

  return (
    <div className="container-swiper">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={3}
        loop={true}
        spaceBetween={10}
        pagination={{ clickable: true }}
        navigation={true}
        autoplay={{
          delay: 4000,
        }}
        slideToClickedSlide={true}
      >
        {filmes.map((filme) => {
          return (
            <SwiperSlide key={filme.id}>
              <article>
                <strong>{filme.title}</strong>
                <img
                  src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                ></img>
                <Link to={`filme/${filme.id}`}>Acessar</Link>
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
