import React from 'react'
import { Link } from 'react-router-dom'

export default function Movie({serie}) {
  return(
    <div className="col-2" style={{marginBottom: '12px'}}>
        <div className="card">
          <img className="card-img" src={serie.poster_path} style={{height: '53%'}} alt="migg"></img>
          <div className="card-body" style={{textAlign: 'left'}}>
            <h6 className="card-title" style={{textAlign: 'center'}}>{serie.title}</h6>
            <div className="card-detail">
              <p className="card-text"><span class="fa fa-star checked text-warning"></span> <span> {serie.popularity} </span></p>
              <Link to={`/series/${serie._id}`} className="btn btn-dark">Detail</Link>
            </div>
          </div>
        </div>
      </div>
  )
}