import { ChangeEvent } from "react";
import type { TCategoriesSelected } from "../../types"

const ListCategories = (
    { categories, inputSelected, setInputSelected, setLoading }:
        { categories: TCategoriesSelected[], inputSelected: string[], setInputSelected: string[], setLoading: boolean }) => {

    const handleChangeFilter = (e: ChangeEvent<HTMLInputElement>) => {
        const valueSelected = e.target.value;
        // console.log('valueSelected', valueSelected);

        const findListFilter = inputSelected.find(input => input === valueSelected);
        // console.log('findListFilter',findListFilter);
        setTimeout(() => {
            setLoading(true)
        }, 1000)

        if (findListFilter !== undefined) {
            const updateListFilter = inputSelected.filter(input => input !== valueSelected);
            setTimeout(() => {
                setLoading(false);
                setInputSelected(updateListFilter)
            }, 2000);
        } else {
            setTimeout(() => {
                setLoading(false);
                setInputSelected(prev => [...prev, valueSelected])
            }, 2000);
        }


    }
    return (
        <section className="flex flex-col items-center justify-center p-5">
            <h4 className="text-2xl font-semibold mb-2">Categories Filter</h4>
            <div className="mt-5 flex flex-wrap p-5 w-4/5 rounded-lg shadow-xl border border-slate-400 gap-5 ">
                {categories.map(cat => (
                    <div key={cat.id} className="bg-slate-300 rounded-full p-2 cursor-pointer flex gap-2">
                        <input type="checkbox" value={cat.id} onChange={handleChangeFilter} />
                        <label htmlFor="">{cat.name}</label>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ListCategories