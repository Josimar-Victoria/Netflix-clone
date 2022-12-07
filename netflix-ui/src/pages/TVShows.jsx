import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import SelectGenre from '../components/SelectGenre'
import Slider from '../components/Slider'
import { fetchMovies, getGenres } from '../store'
import { firebaseAuth } from '../util/firebase-config'

const TVShows = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const movies = useSelector(state => state.netflix.movies)
  const genres = useSelector(state => state.netflix.genres)
  const genresLoaded = useSelector(state => state.netflix.genresLoaded)
  const dataLoading = useSelector(state => state.netflix.dataLoading)
  const [user, setUser] = useState(undefined)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!genres.length) dispatch(getGenres())
  }, [dispatch, genres.length])

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: 'tv' }))
    }
  }, [genresLoaded, dispatch, genres])

  onAuthStateChanged(firebaseAuth, currentUser => {
    if (currentUser) setUser(currentUser.uid)
    else navigate('/login')
  })

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true)
    return () => (window.onscroll = null)
  }
  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className='data'>
        <SelectGenre genres={genres} type='tv' />
        {movies.length ? (
          <>
            <Slider movies={movies} />
          </>
        ) : (
          <h1 className='not-available'>
            No TV Shows avaialble for the selected genre. Please select a
            different genre.
          </h1>
        )}
      </div>
    </Container>
  )
}

export default TVShows

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      margin-top: 4rem;
    }
  }
`
