import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { TDataApi } from "../types";

const DetailPage = () => {
    const navigate = useNavigate()
    const getUrl = useLocation()
    const [detailCard, setDetailCard] = useState<TDataApi | null>(null)

    const splitId = getUrl.pathname.split('/')[2];
    console.log('splitId', splitId);

    useEffect(() => {
        const fetchDataId = async () => {
            const response = await axios.get(`/api/posts/${splitId}`)
            console.log(response.data);
            setDetailCard(response.data.post)
        }
        fetchDataId()
    }, [splitId])

    return (
        <>
            <button className="absolute flex right-2 top-2 p-2 bg-slate-600 text-white font-semibold justify-end rounded-lg"
                onClick={() => navigate("/")}>
                Back
            </button>
            <div className="flex items-center justify-center top-0 bottom-0 left-0 right-0 h-screen w-screen">
                {detailCard &&
                    <div className="flex flex-col h-[20rem] w-[27rem] shadow-xl border border-slate-400 rounded-lg p-3 overflow-y-auto">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 w-4/5 mr-2 p-2">
                                <img src={detailCard.author.avatar} alt={detailCard.author.name} className="h-12 w-12 rounded-full" />
                                <h1 className="text-lg font-semibold" style={{ textTransform: 'capitalize' }}>{detailCard.title}</h1>
                            </div>
                            <span className="w-1/5 font-semibold text-slate-500">{new Date(detailCard.publishDate).toLocaleDateString()}</span>
                        </div>

                        <div className="flex flex-col gap-2 mt-2">
                            <p className="bg-blue-300 p-2 rounded-xl">{detailCard.summary}</p>
                            <div className="flex flex-wrap gap-2">
                                {detailCard.categories.map(cat => (
                                    <span key={cat.id} className="bg-green-300 rounded-xl p-2">{cat.name}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default DetailPage