import React from 'react'
import Movie from '../components/Movie'
import Serie from '../components/Serie'
import { useQuery, gql } from '@apollo/client'

const GET_MOVIES_AND_SERIES = gql`
  query {
    getMovies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
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


export default function Home() {
  const { data, loading, error } = useQuery(GET_MOVIES_AND_SERIES)
  
  if (loading) {
    return(
      <div className="d-flex justify-content-center loading">
        <div className="spinner-border text-light" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    )
  }

  return(
    <>
      <h1 className="text-light content">Movies</h1>
      <div className="movies row">
        {data.getMovies.map(movie => {
          return <Movie movie={movie} key={movie._id}></Movie> 
        })}
      </div>
      <h1 className="text-light content">Series</h1>
      <div className="series row">
        {data.getSeries.map(serie => {
          return <Serie serie={serie} key={serie._id}></Serie> 
        })}
      </div>
    </>
  )
}