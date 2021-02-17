import React from 'react'
import Movie from '../components/Movie'
import { useQuery, gql } from '@apollo/client'


export default function Favorites() {
  const GET_FAVORITES = gql`
    query GetFavorites {
      favorites @client
    }
  `

  const { data, loading, error } = useQuery(GET_FAVORITES)

  // console.log(data)

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
      <h1 className="text-light content">Favorites</h1>
      <div className="movies row">
        {data.favorites.map(movie => {
          return <Movie movie={movie} key={movie._id}></Movie> 
        })}
      </div>
    </>
  )
}