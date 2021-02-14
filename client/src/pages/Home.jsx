import React from 'react'
import Movie from '../components/Movie'
import { useQuery, gql } from '@apollo/client'

const GET_MOVIES = gql`
  query {
    getMovies {
      _id
      title
      overview
      poster_path
      rating
      tags

    }
  }
`

export default function Home() {
  const { data: movies, loading, error } = useQuery(GET_MOVIES)
  console.log(movies)

  if (loading) {
    return(
      <div className="d-flex justify-content-center loading">
        <div className="spinner-border text-dark" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    )
  }

  return(
    <>
      <h1 className="text-danger content">Movies</h1>
      <div className="movies row">
        {movies.getMovies.map(movie => {
          return <Movie movie={movie} key={movie._id}></Movie> 
        })}
      </div>
      <h1 className="text-danger content">Series</h1>
      <div className="series row">
      </div>
    </>
  )
}