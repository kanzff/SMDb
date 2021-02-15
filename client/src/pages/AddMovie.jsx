import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'

const ADD_MOVIE = gql`
  mutation AddMovie($newMovie: MovieInput){
    addMovie(data: $newMovie){
      _id
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

export default function AddMovie() {
  const history = useHistory()
  const [addMovie, { data }] = useMutation(ADD_MOVIE, {
    refetchQueries: [{ query: GET_MOVIES }]
  })
  const [inputMovie, setInputMovie] = useState({
    title: "",
    overview: "",
    poster_path: "",
    popularity: "",
    tags: ""
  })

  function handleInputChange(e) {
    const { value, name } = e.target
    setInputMovie({
      ...inputMovie,
      [name]: value
    })
  }

  function addNewMovie(e) {
    const { title, overview, poster_path, popularity, tags } = inputMovie
    e.preventDefault()
    addMovie({
      variables: {
        newMovie: {
          title,
          overview,
          poster_path,
          popularity: Number(popularity),
          tags
        }
      }
    })
    history.push('/movies')
  }

  return(
    <>
      <h1 className="text-danger content">Add Movie</h1>
      <div className="col-6 offset-3">
        <form onSubmit={addNewMovie}>
          <div className="form-group">
            <input 
              type="text" 
              name="title" 
              value={inputMovie.name} className="form-control" 
              placeholder="Title"
              onChange={(e) => handleInputChange(e)}
            >
            </input>
          </div><br/>
          <div className="form-group">
            <input 
              type="text" 
              name="overview" className="form-control" 
              placeholder="Overview"
              value={inputMovie.overview}
              onChange={(e) => handleInputChange(e)}
              >
            </input>
          </div><br/>
          <div className="form-group">
            <input 
            type="text" 
            name="poster_path" className="form-control" 
            placeholder="Poster Path"
            value={inputMovie.poster_path}
            onChange={(e) => handleInputChange(e)}
            >
            </input>
          </div><br/>
          <div className="form-group">
            <input 
            type="number" 
            name="popularity" className="form-control" 
            placeholder="Popularity"
            value={inputMovie.popularity}
            onChange={(e) => handleInputChange(e)}
            ></input>
          </div><br/>
          <div className="form-group">
            <input 
            type="text" 
            name="tags" className="form-control" 
            placeholder="Tags1, Tags2, .."
            value={inputMovie.tags}
            onChange={(e) => handleInputChange(e)}
            ></input>
          </div><br/>
          <button type="submit" className="btn add-btn btn-danger text-dark">Add</button>
        </form>
      </div>
    </>
    
  )
}