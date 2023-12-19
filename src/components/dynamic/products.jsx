import {
    useState, useEffect
} from 'react'

export default function Products({
    extend = false, 
}) {
    const [data, handleData] = useState([])
    const [current, setCurrent] = useState(0) 

    useEffect(() => {
        const pathWithoutSlashes = window.location.pathname.replace(/^\/|\/$/g, '');
        const segments = pathWithoutSlashes.split('/');

        const availableLanguages = ['fr', 'es', 'en']

        fetch(`/locales/${ segments[0] && availableLanguages.includes(segments[0]) ? segments[0] : 'es' }/products.json`)
            .then(response => response.json())
            .then(data => handleData(data))
    }, [])

    return <div className="flex flex-col py-10 h-screen w-[1100px] bg-white px-10 rounded">
        <section className="flex flex-wrap gap-5">
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

        <section className="flex flex-col md:flex-row gap-7 md:gap-0 mt-10 h-auto md:h-[500px]">
            {
                !extend && <div className="flex-1 bg-gray-50 rounded flex items-center justify-center">
                    <img 
                        src={ data.categories && data.categories[current] && data.categories[current].image }
                        className="w-[450px]"
                        draggable="false"
                    />
                </div>
            }

            <div className="flex-1 flex flex-col px-5">
                {
                    data.products && data.products.filter(product => product.category == data.categories[current].name).slice(0, extend ? -1 : 5).map((product, index) => {
                        return <div className="flex py-3 items-center border-b border-dotted" key={ index }>
                            <div className="flex-1 flex items-center gap-5">
                                <section className="flex flex-col flex-1">
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

                                <button className="border border-black text-black hover:border-red-400 hover:text-red-400 transition-all rounded-sm px-5 py-2 flex items-center gap-3">
                                    <span className='material-symbols-outlined'>
                                        shopping_cart
                                    </span>

                                    Añadir
                                </button>
                            </div>
                        </div>
                    })
                }
            </div>
        </section>
    </div>
}