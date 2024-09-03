import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./MovieSlider.style.css";
import MovieCard from "../MovieCard/MovieCard";

const MovieSlider = ({ title, movies, responsive }) => {
  return (
    <div>
      <h3>{title}</h3>
      <Carousel
        // swipeable={false}
        // draggable={false}
        // showDots={true}
        // responsive={responsive}
        // ssr={true} // means to render carousel on server-side.
        // infinite={true}
        // autoPlay={this.props.deviceType !== "mobile" ? true : false}
        // autoPlaySpeed={1000}
        // keyBoardControl={true}
        // customTransition="all .5"
        // transitionDuration={500}
        // containerClass="carousel-container"
        // removeArrowOnDeviceType={["tablet", "mobile"]}
        // deviceType={this.props.deviceType}
        // dotListClass="custom-dot-list-style"
        // itemClass="carousel-item-padding-40-px"
        infinite={true}
        centerMode={true}
        itemClass="movie-slider p-1"
        containerClass="carousel-container"
        responsive={responsive}
      >
        {movies.map((movie, index) => (
          <MovieCard movie={movie} key={index} />
        ))}
      </Carousel>
      ;
    </div>
  );
};

export default MovieSlider;
