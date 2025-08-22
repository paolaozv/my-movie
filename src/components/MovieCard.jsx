const MovieCard = ({ movie: 
    { title, vote_average, poster_path, release_date, original_language, overview }
  , handleSelectedMovie}) => {
  return (
    <div className="movie-card">
      <img src={poster_path ?`https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'} alt={title} />
      <div className="mt-4">
        <button
          data-modal-target="static-modal"
          data-modal-toggle="static-modal"
          className="block text-white hover:underline cursor-pointer" 
          type="button"
          onClick={() => handleSelectedMovie({ title, vote_average, poster_path, release_date, overview })}
        >
          <h3>{title}</h3>
        </button>
        <div className="content">
          <div className="rating">
            <img src="./star.svg" alt="Star Icon" />
            <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
          </div>
          <span>•</span>
          <p className="lang">{original_language}</p>
          <span>•</span>
          <p className="year">{release_date ? release_date.split('-')[0] : 'N/A'}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieCard