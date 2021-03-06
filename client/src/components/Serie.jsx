import React from 'react'
import { Link } from 'react-router-dom'

export default function Movie({serie}) {
  return(
    <div className="col-2" style={{marginBottom: '12px'}}>
        <div className="card">
          <img className="card-img" src={serie.poster_path} style={{height: '53%'}} alt="migg"></img>
          <div className="card-body" style={{textAlign: 'left'}}>
            <h6 className="card-title" style={{textAlign: 'center', fontWeight: 'bold'}}>{serie.title}</h6>
            <div className="card-detail container">
              <div className="row">
                <div className="col-10">
                  <p className="card-text"><span className="fa fa-star checked text-warning"></span> <span> {serie.popularity} </span></p>
                  <p style={{fontSize: 15}}>{serie.tags.join(', ')}</p>
                </div>
                <div className="col-2">
                  <Link to={`/series/${serie._id}`} className="btn card-btn btn-dark-block"><span className="fa fa-info-circle checked"></span></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}