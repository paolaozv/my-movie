import { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'
import './App.css'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'
import Pagination from './components/Pagination'
import { updateSearchCount, getTrendingMovies } from './appwrite'

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const API_OPTIONS = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${API_KEY}`
	}
}

const App = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [movieList, setMovieList] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(0)
	const [isLoading, setIsLoading] = useState(false)
	const [trendingMovies, setTrendingMovies] = useState([])
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

	// Debounced the search term to prevent making too many API requests
	// by waiting for the user to stop typing for 500ms
	useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

	const fetchMovies = async (query = '') => {
		setIsLoading(true)
		setErrorMessage('')

		try {
			const endpoint = query
				? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
				: `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${currentPage}`
			const response = await fetch(endpoint, API_OPTIONS)

			if (!response.ok) {
				throw new Error('Failed to fetch movies')
			}

			const data = await response.json()

			if (data.Response === 'False') {
				setErrorMessage(data.Error || 'Failed to fetch movies')
				setMovieList([])
				return
			}

			setMovieList(data.results || [])
			setTotalPages(data.total_pages || 0)

			if (query && data.results.length > 0) {
				await updateSearchCount(query, data.results[0])
			}
			
		} catch (error) {
			console.error(`Error fetching movies: ${error}`)
			setErrorMessage('Error fetching movies. Please try again later.')
		} finally {
			setIsLoading(false)
		}
	}

	const loadTrendingMovies = async () => {
		try {
			const movies = await getTrendingMovies()

			setTrendingMovies(movies)
		} catch (error) {
			console.error(`Error fetching trending movies: ${error}`)
		}
	}

	useEffect(() => {
		fetchMovies(debouncedSearchTerm)
	}, [debouncedSearchTerm, currentPage])

	useEffect(() => {
		loadTrendingMovies()
	}, [])

  return (
    <main>
			<div className='pattern' />
			<div className='wrapper'>
				<header>
					<img src='./hero-img.png' alt='Hero Banner' />
					<h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle</h1>
					<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
				</header>

				{trendingMovies.length > 0 && (
					<section className='trending'>
						<h2>Trending Movies</h2>
						<ul>
							{trendingMovies.map((movie, index) => (
								<li key={movie.$id}>
									<p>{index + 1}</p>
									<img src={movie.poster_url} alt={movie.title} />
								</li>
							))}
						</ul>
					</section>
				)}

				<section className='all-movies'>
					<h2 className='mt-[40px]'>All Movies</h2>
					{isLoading ? (
						<Spinner />
					) : errorMessage ? (
						<p className='text-red-500'>{errorMessage}</p>
					) : (
						<ul>
							{movieList.map((movie) => (
								<MovieCard key={movie.id} movie={movie} />
							))}
						</ul>
					)}
				</section>

				<section>
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						paginate={setCurrentPage}
					/>
				</section>
			</div>
    </main>
  )
}

export default App
