const MovieModal = ({ open, setOpenModal, movie }) => {
	return (
		<div
			id="static-modal"
			data-modal-backdrop="static"
			tabIndex="-1"
			className={"modal overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full" + (open? ' flex' : ' hidden')}
		>
			<div className="relative p-4 w-full max-w-xl max-h-full">
				<div className="content relative">
					<div className="flex items-center justify-end p-1 md:p-2">
						<button
							type="button"
							className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
							data-modal-hide="static-modal"
							onClick={() => setOpenModal(false)}
						>
							<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
								<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
							</svg>
							<span className="sr-only">Close modal</span>
						</button>
					</div>
					{movie && (
						<div className="px-4 md:px-5 pb-4 md:pb-5">
							<div className="md:flex md:justify-between md:items-center">
								<h2 className="font-bold text-xl md:text-2xl">{movie.title}</h2>
								<div className="flex justify-end gap-2 mt-2 md:mt-0">
									<div className="box flex items-center">
										<img src="./star.svg" alt="rating" />
										<p className="ml-2">
											<span>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
											<span className="text-indigo-300">/10</span>
										</p>
									</div>
									<div className="box flex items-center">
										<img src="./grow.svg" alt="grow" />
										<p className="text-indigo-300 ml-1">1</p>
									</div>
								</div>
							</div>
							<div className="flex items-center mt-2 text-indigo-300 justify-end md:justify-start">
								<p className="mr-1">{movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
								{/* <span>•</span>
								<p className="mx-1">PG-13</p>
								<span>•</span>
								<p className="ml-1">2h 46m</p> */}
							</div>
							<div className='mt-2'>
								<img src={movie.poster_path ?`https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/no-movie.png'} alt={movie.title} />
							</div>
							<div className="md:flex md:items-center mt-6">
								<p className="text-indigo-300 mr-3 mb-1 md:mb-0">Overview</p>
								<p>{movie.overview}</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default MovieModal
