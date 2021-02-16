import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

export default function DetailMovie() {
  const { id } = useParams()
  const { data, loading, error } = useQuery(gql`
  query {
    getMovie(_id:"${id}"){
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
  `)
  

  if (loading) {
    return(
      <div className="d-flex justify-content-center loading">
        <div className="spinner-border text-danger" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    )
  }

  return(
    <>
      <h1 className="text-danger content">Detail</h1>
      <div className="row content">
        <div className="col-8 offset-2 detail">
          <div className="card">
            <div className="row detail-card">
              <div className="col-4">
                <img src={data.getMovie.poster_path} className="detail-card-img" alt=".."></img>
              </div>
              <div className="col-7 offset-1" style={{textAlign: "left"}}>
                <h4>{data.getMovie.title}</h4>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.getMovie.overview}</p>
                <div className="card-detail">
                  <p><span className="fa fa-star checked text-warning"></span> {data.getMovie.popularity}</p>
                  <p>Tags: {data.getMovie.tags.join(',')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )

}