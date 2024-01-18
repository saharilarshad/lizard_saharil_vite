import { Link } from "react-router-dom"
import { TDataApi } from "../../types"

const ListDataCard = ({ dataApi }: { dataApi: TDataApi[] | null }) => {
  return (
    <section className="flex flex-wrap justify-center p-5 h-full w-screen gap-5">
      {dataApi && dataApi?.map(dt => (
        <Link to={`/detail/${dt.id}`} key={dt.id}>
          <div className="flex flex-col h-[20rem] w-[27rem] shadow-xl border border-slate-400 rounded-lg p-3 overflow-y-auto">

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
        </Link>
      ))}

    </section>
  )
}

export default ListDataCard