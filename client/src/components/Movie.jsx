import React from 'react'
import { Link } from 'react-router-dom'

export default function Movie({movie}) {
  return(
    <div className="col-2" style={{marginBottom: '12px'}}>
        <div className="card">
          <img className="card-img" src='https://images.moviepostershop.com/replicas-movie-poster-1000778791.jpg' style={{height: '53%'}} alt="migg"></img>
          <div className="card-body" style={{textAlign: 'left'}}>
            <h6 className="card-title" style={{textAlign: 'center'}}>{movie.title}</h6>
            <div className="card-detail">
              <p className="card-text">Popularity : <span> 8.5 </span></p>
              <Link to={`/movies/${movie._id}`} className="btn btn-dark">Detail</Link>
            </div>
          </div>
        </div>
      </div>
  )
}