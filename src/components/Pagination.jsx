const Pagination = ({ currentPage, totalPages, paginate }) => {

	const previousPage = (e) => {
		e.preventDefault()
		if (currentPage === 1) return
		else {
			window.scrollTo(0, 0)
			paginate(currentPage - 1)
		}
	}

	const nextPage = (e) => {
		e.preventDefault()
		if (currentPage === totalPages) return
		else {
			window.scrollTo(0, 0)
			paginate(currentPage + 1)
		}
	}

  return (
    <nav className='mt-40'>
			<div className="flex justify-center items-center text-white">
				<button
					className={`pagination ${currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
					onClick={(e) => previousPage(e)}
					disabled={currentPage === 1}
				>
					<img
						src="./arrow-left.svg"
						alt="Previous Page"
					/>
				</button>

				<div className="mx-8 flex">
					<p className="font-bold">
						{currentPage}
					</p>
					<p className="mx-2">/</p>
					<p>{totalPages}</p>
				</div>
				
				<button
					className={`pagination ${currentPage === totalPages ? 'cursor-not-allowed' : 'cursor-pointer'}`}
					onClick={(e) => nextPage(e)}
				>
					<img
						src="./arrow-right.svg"
						alt="Next Page"
					/>
				</button>
			</div>
		</nav>
  )
}

export default Pagination