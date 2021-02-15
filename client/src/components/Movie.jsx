import React from 'react'
import { Link } from 'react-router-dom'

export default function Movie({movie}) {
  return(
    <div className="col-2" style={{marginBottom: '12px'}}>
        <div className="card">
          <img className="card-img" src={movie.poster_path} style={{height: '53%'}} alt="migg"></img>
          <div className="card-body" style={{textAlign: 'left'}}>
            <h6 className="card-title" style={{textAlign: 'center'}}>{movie.title}</h6>
            <div className="card-detail">
              <p className="card-text"><span class="fa fa-star checked text-warning"></span> <span> {movie.popularity} </span></p>
              <Link to={`/movies/${movie._id}`} className="btn btn-dark">Detail</Link>
              <Link to={`/movies/edit/${movie._id}`} className="btn btn-dark" style={{marginLeft: 40}}>Edit</Link>
            </div>
          </div>
        </div>
      </div>
  )
}