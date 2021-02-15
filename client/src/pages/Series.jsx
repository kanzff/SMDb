import React from 'react'
import Serie from '../components/Serie'
import { useQuery, gql } from '@apollo/client'

const GET_SERIES = gql`
  query {
    getSeries {
      _id
      title
      overview
      poster_path
      popularity
      tags

    }
  }
`

export default function Series() {
  const { data: series, loading, error } = useQuery(GET_SERIES)
  console.log(series)

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
      <h1 className="text-danger content">Series</h1>
      <div className="series row">
        {series.getSeries.map(serie => {
          return <Serie serie={serie} key={serie._id}></Serie> 
        })}
      </div>
    </>
  )
}