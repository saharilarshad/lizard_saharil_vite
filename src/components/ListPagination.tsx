import React from "react"

const ListPagination = (
    { pagesNumbers, currentPage, setCurrentPage }:
        { pagesNumbers: number[], currentPage: number, setCurrentPage: number }
) => {
    return (
        <section className="flex items-center justify-end my-2 mr-2 p-2 gap-1">
            {pagesNumbers.map((numberPage, index) => (
                <React.Fragment key={numberPage}>
                    <span className={`border-2 p-2 cursor-pointer border-slate-400 rounded-md ${numberPage === currentPage && 'text-green-500 font-semibold'}`}
                    onClick={() => setCurrentPage(numberPage)}
                    >
                        {numberPage}
                    </span>

                </React.Fragment >

            ))}
        </section>
    )
}

export default ListPagination