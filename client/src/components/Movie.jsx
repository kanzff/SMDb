import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'
import { favoritesVar } from '../config/cache'

const DESTROY_MOVIE = gql`
  mutation DestroyMovie($id: ID){
    destroyMovie(_id: $id){
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`
const GET_MOVIES = gql`
  query {
    getMovies {
      _id
      title
      overview
      poster_path
      popularity
      tags

    }
  }
`


export default function Movie({movie}) {
  const history = useHistory()
  const [destroyMovie, { data }] = useMutation(DESTROY_MOVIE, {
    refetchQueries: [{ query: GET_MOVIES }]
  })

  function destroy(movieId) {
    console.log(movieId)
    destroyMovie({
      variables: {
        id: movieId
      }
    })

  }

  function addToFavorite() {
    let alreadyInFav = false 
    const currentFavorites = favoritesVar()
    currentFavorites.map(favMovie => {
      if (favMovie._id === movie._id) {
        alreadyInFav = true
      }
    })

    if (alreadyInFav === false) {
      favoritesVar([...currentFavorites, movie])
    }

    history.push('/favorites')
  }

  // const tags = movie.tags?.join(', ')
  return(
    <div className="col-2" style={{marginBottom: '12px'}}>
        <div className="card">
          <img className="card-img" src={movie.poster_path} style={{height: '53%'}} alt="migg"></img>
          <div className="card-body" style={{textAlign: 'left'}}>
            <h6 className="card-title" style={{textAlign: 'center', fontWeight: 'bold'}}>{movie.title}</h6>
            <div className="card-detail container">
              <div className="row">
                <div className="col-10">
                  <p className="card-text"><span className="fa fa-star checked text-warning"></span> <span> {movie.popularity} </span>
                    <button onClick={() => addToFavorite()} className="btn card-btn btn-block text-danger" style={{marginLeft: 35}}>
                      <span className="fa fa-heart"></span>
                    </button>
                  </p>
                  <p style={{fontSize: 15}}>{movie.tags.join(',')}</p>
                </div>
                <div className="col-2">
                  <Link to={`/movies/${movie._id}`} className="btn card-btn btn-dark-block"><span className="fa fa-info-circle checked"></span></Link>
                  <Link to={`/movies/edit/${movie._id}`} className="btn card-btn btn-dark-block"><span className="fa fa-cog"></span></Link>
                  <button onClick={() => destroy(movie._id)} className="btn card-btn btn-block text-danger"><span className="fa fa-trash"></span></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}