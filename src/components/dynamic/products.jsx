import {
    useState, useEffect
} from 'react'
import SingleProduct from './single'

export default function Products({
    extend = false, 
}) {
    const [data, handleData] = useState([])
    const [current, setCurrent] = useState(0)
    const [products, setProducts] = useState([])
    const [processing, handleProcess] = useState(false)

    const handleProduct = (product) => {
        if(products.find(res => res.name == product.name)) return setProducts(products.filter(res => res.name != product.name))

        setProducts([
            ...products, 
            {
                ...product, 
                quant: 1
            }
        ])
    }

    const handleQuant = (product, quant) => {
        setProducts(products.map(res => {
            if(res.name == product.name) return {
                ...res, 
                quant
            }

            return res
        }))
    }

    useEffect(() => {
        const pathWithoutSlashes = window.location.pathname.replace(/^\/|\/$/g, '');
        const segments = pathWithoutSlashes.split('/');

        const availableLanguages = ['fr', 'es', 'en']

        fetch(`/locales/${ segments[0] && availableLanguages.includes(segments[0]) ? segments[0] : 'es' }/products.json`)
            .then(response => response.json())
            .then(data => handleData(data))
    }, [])

    return <div className="flex flex-col py-10 min-h-screen w-[90%] lg:w-[1100px] bg-white px-10 rounded mt-10">
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

            {
                data.categories && <button 
                    className={ `border border-red-400 text-sm material-symbols-outlined ${ current === (data.categories.length + 1) ? 'bg-red-400 text-white' : ' text-red-400' } px-5 py-2` }
                    onClick={ () => setCurrent(data.categories.length + 1) }
                >
                    shopping_cart
                </button>
            }
        </section>

        <section className="flex flex-col gap-7 md:gap-0 mt-10">
            { 
                data.products && (data.categories[current] ? data.products.filter(product => product.category == data.categories[current].name).slice(0, extend ? -1 : 5) : products).map((product, index) => {
                    const storedProduct = products.find(res => res.name == product.name)

                    return <SingleProduct 
                        key={ index }
                        product={ product }
                        storedProduct={ storedProduct }
                        handleProduct={ handleProduct }
                        handleQuant={ handleQuant }
                        setProducts={ setProducts }
                    />
                })
            }

            <div className='mt-10 flex gap-7 justify-end items-center'>
                <span className='text-red-500 text-2xl'>{ Math.round(products.reduce((acc, product) => acc + (product.quant * product.price), 0), 2) }€</span>
            
                <button onClick={() => {
                    handleProcess(true)
                    
                    setTimeout(() => {
                        setProducts([]);
                        handleProcess(false);
                    }, 2000);
                }} className="border border-red-400 justify-center bg-red-400 text-white hover:bg-red-500 transition-all rounded-sm px-5 py-2 flex items-center gap-3">
                    {
                        processing ? <svg aria-hidden="true" class="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-red-900" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg> : <span className='material-symbols-outlined'>
                            account_balance_wallet
                        </span>
                    }
                </button>
            </div>
        </section>
    </div>
}