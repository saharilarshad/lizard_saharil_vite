import { ChangeEvent, useEffect, useMemo, useState } from "react";
// import { useMirageServer } from "./mock"
import type { TCategoriesSelected, TDataApi } from "../types"
import axios from "axios";
import ListCategories from "./components/ListCategories";
import ListDataCard from "./components/ListDataCard";
import ListPagination from "./components/ListPagination";
import Loading from "./components/Loading";



const Home = () => {

    const [dataApi, setDataApi] = useState<TDataApi[] | null>(null)
    const [categories, setCategories] = useState<TCategoriesSelected[]>([])
    const [inputSelected, setInputSelected] = useState<string[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/posts');
                // console.log("res", response.data)
                if (inputSelected.length > 0) {
                    const getApiData = response.data
                    // const filterData = getApiData.posts.filter(data => data.categories.toLowerCase().includes(inputSelected))
                    // const filterData = getApiData.posts.filter(data =>
                    //   data.categories.some(cat => inputSelected.includes(cat.name.toLowerCase()))
                    // );
                    const filterData = getApiData.posts.filter(data =>
                        inputSelected.every(selectedCategory =>
                            data.categories.some(postCategory =>
                                postCategory.name.toLowerCase() === selectedCategory.toLowerCase()
                            )
                        )
                    );

                    // console.log('filterData', filterData);
                    setDataApi(filterData)
                } else {
                    setDataApi(response.data.posts);
                }

                const uniqueCategories: TCategoriesSelected[] = Array.from(
                    new Set(response.data?.posts.flatMap((post: TDataApi) => post.categories
                        .map((cat) => cat.name))))
                    .map((name) => ({ id: name.toLowerCase(), name }));

                // console.log(uniqueCategories);
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [inputSelected]);

    // const pageSize = 6
    const totalPages = dataApi ? Math.ceil(dataApi?.length / 6) : 0
    // console.log("totalPages", totalPages)

    const pagesNumbers: number[] = Array.from({ length: totalPages }, (_, index) => index + 1)
    // console.log("pagesNumbers", pagesNumbers)

    // const pageStart = (currentPage - 1) * pageSize
    // const pageEnd = pageStart + pageSize

    // const paginationPages = dataApi?.slice(pageStart, pageEnd)
    // console.log('paginationPages', paginationPages)

    const paginatedData = useMemo(() => {
        const pageSize = 6;
        const pageStart = (currentPage - 1) * pageSize;
        const pageEnd = pageStart + pageSize;
        return dataApi?.slice(pageStart, pageEnd) || [];
    }, [dataApi, currentPage]);

    useEffect(() => {
        if (paginatedData) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }

    }, [paginatedData])

    // const handleChangeFilter = (e: ChangeEvent<HTMLInputElement>) => {
    //   const valueSelected = e.target.value;
    //   // console.log('valueSelected', valueSelected);

    //   const findListFilter = inputSelected.find(input => input === valueSelected);
    //   // console.log('findListFilter',findListFilter);

    //   if (findListFilter !== undefined) {
    //     const updateListFilter = inputSelected.filter(input => input !== valueSelected);
    //     setInputSelected(updateListFilter)
    //   } else {
    //     setInputSelected(prev => [...prev, valueSelected])

    //   }
    // }

    // useEffect(() => {


    // },[])
    // console.log('inputSelected', inputSelected);
    // console.log('dataApi', dataApi);
    console.log('loading', loading);

    return (
        <>
            {/* <div className="flex flex-col items-center justify-center p-5">
        <h4 className="text-2xl font-semibold mb-2">Categories Filter</h4>
        <div className="mt-5 flex flex-wrap p-5 w-4/5 rounded-lg shadow-xl border border-slate-400 gap-5 ">
          {categories.map(cat => (
            <div key={cat.id} className="bg-slate-300 rounded-full p-2 cursor-pointer flex gap-2">
              <input type="checkbox" value={cat.id} onChange={handleChangeFilter} />
              <label htmlFor="">{cat.name}</label>
            </div>
          ))}
        </div>
      </div> */}
            <ListCategories
                categories={categories} inputSelected={inputSelected}
                setInputSelected={setInputSelected}
                setLoading={setLoading}
            />
            {/* <div className="flex flex-wrap justify-center p-5 h-full w-screen gap-5">
        {dataApi && dataApi?.map(dt => (
          <div className="flex flex-col h-[20rem] w-[27rem] shadow-xl border border-slate-400 rounded-lg p-3 overflow-y-auto" key={dt.id}>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 w-4/5 mr-2 p-2">
                <img src={dt.author.avatar} alt={dt.author.name} className="h-12 w-12 rounded-full" />
                <h1 className="text-lg font-semibold" style={{ textTransform: 'capitalize' }}>{dt.title}</h1>
              </div>
              <span className="w-1/5 font-semibold text-slate-500">{new Date(dt.publishDate).toLocaleDateString()}</span>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <p className="bg-blue-300 p-2 rounded-xl">{dt.summary}</p>
              <div className="flex flex-wrap gap-2">
                {dt.categories.map(cat => (
                  <span key={cat.id} className="bg-green-300 rounded-xl p-2">{cat.name}</span>
                ))}
              </div>
            </div>
          </div>
        ))}

      </div> */}
            {loading ? (
                <Loading />
            ) : (
                <>
                    <ListDataCard dataApi={paginatedData} />
                    <ListPagination pagesNumbers={pagesNumbers} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </>
            )}
        </>
    )
}

export default Home
