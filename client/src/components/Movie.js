const Movie = ({title, synopsis, picture, year}) => {
    return (
        <div className="movie">
            <img src={picture} alt={title} />
            <div className="movie-info">
                <h3>{title}</h3>
                <span>{year}</span>
            </div>
            <div className="movie-overview">
                <h3>{title}</h3>
                <p>{synopsis}</p>
            </div>
        </div>
    )
}

export default Movie;