import {
    useState, useEffect
} from 'react'

export default function LandingProducts() {
    const [data, handleData] = useState([])
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        fetch('/static/products.json')
            .then(response => response.json())
            .then(data => handleData(data))
    }, [])

    return <div className="flex flex-col py-10">
        <section className="flex gap-5">
            {
                data.categories && data.categories.map((category, index) => {
                    return <button 
                        className={ `border border-red-400 ${ current === index ? 'bg-red-400 text-white' : ' text-red-400' } px-5 py-2` }
                        onClick={ () => setCurrent(index) }
                        key={ index }
                    >
                        { category.name }
                    </button>
                })
            }
        </section>

        <section className="flex mt-10 h-[500px]">
            <div className="flex-1 bg-gray-50 flex items-center justify-center">
                <img 
                    src={ data.categories && data.categories[current] && data.categories[current].image }
                    className="w-[450px]"
                    draggable="false"
                />
            </div>

            <div className="flex-1 flex flex-col px-5">
                {
                    data.products && data.products.filter(product => product.category == data.categories[current].name).slice(0, 5).map((product, index) => {
                        return <div className="flex py-3 items-center border-b border-dotted" key={ index }>
                            <div className="flex-1 flex items-center justify-between">
                                <section className="flex flex-col">
                                    <h3 className="text-lg font-bold">
                                        { product.name }
                                    </h3>

                                    <p className="text-sm mt-1 text-gray-500">
                                        { product.description }
                                    </p> 
                                </section>

                                <p className="text-md  text-red-500">
                                    €{ product.price }
                                </p> 
                            </div>
                        </div>
                    })
                }
            </div>
        </section>
    </div>
}