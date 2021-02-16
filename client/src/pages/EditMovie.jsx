import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { gql, useMutation, useQuery } from '@apollo/client'

const EDIT_MOVIE = gql`
  mutation EditMovie($newMovie: MovieUpdate){
    updateMovie(data: $newMovie){
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

export default function EditMovie() {
  const history = useHistory()
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
  const [updateMovie] = useMutation(EDIT_MOVIE, {
    refetchQueries: [{ query: GET_MOVIES }]
  })
  
  const [inputMovie, setInputMovie] = useState({
    title: "",
    overview: "",
    poster_path: "",
    popularity: "",
    tags: ""
  })

  useEffect(() => {
    if (data) {
      setInputMovie({
        title: data.getMovie.title,
        overview: data.getMovie.overview,
        poster_path: data.getMovie.poster_path,
        popularity: data.getMovie.popularity,
        tags: data.getMovie.tags,
      })
    }
  }, [data])

  function handleInputChange(e) {
    const { value, name } = e.target
    setInputMovie({
      ...inputMovie,
      [name]: value
    })
  }

  function editNewMovie(e) {
    const { title, overview, poster_path, popularity, tags } = inputMovie
    e.preventDefault()
    updateMovie({
      variables: {
        newMovie: {
          _id: id,
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
      <h1 className="text-danger content">Edit Movie</h1>
      <div className="col-6 offset-3">
        <form onSubmit={editNewMovie}>
          <div className="form-group">
            <input 
              type="text" 
              name="title" 
              value={inputMovie.title} className="form-control" 
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
          <button type="submit" className="btn add-btn btn-danger text-dark">Edit</button>
        </form>
      </div>
    </>
    
  )
}