import {
    useState, useEffect
} from 'react'

import { t } from "i18next";

export default function Products({
    extend = false, 
}) {
    const [data, handleData] = useState([])
    const [current, setCurrent] = useState(0)
    const [products, setProducts] = useState([])

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

    return <div className="flex flex-col py-10 h-screen w-[1100px] bg-white px-10 rounded mt-10">
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

        <section className="flex flex-col gap-7 md:gap-0 mt-10 h-auto md:h-[500px]">
            {
                data.products && data.products.filter(product => product.category == data.categories[current].name).slice(0, extend ? -1 : 5).map((product, index) => {
                    const storedProduct = products.find(res => res.name == product.name)

                    return <div className="flex py-3 items-center border-b border-dotted" key={ index }>
                        <div className="flex-1 flex items-center gap-5">
                            <img src={ product.image } className="w-16 h-16 p-3 rounded-md select-none cursor-pointer" />

                            <section className="flex flex-col flex-1">
                                <h3 className="text-lg font-bold">
                                    { product.name }
                                </h3>

                                <p className="text-sm mt-1 text-gray-500">
                                    { product.description }
                                </p> 
                            </section>

                            <p className="text-xl text-red-500">
                                { product.price }

                                <span className='text-sm pl-1 text-black/30'>
                                    €
                                </span>
                            </p> 

                            {
                                storedProduct && storedProduct.quant && <div className="flex items-center gap-3">
                                    <button onClick={() => {
                                        if(storedProduct.quant == 1) return setProducts(products.filter(res => res.name != product.name))

                                        handleQuant(product, storedProduct.quant - 1)
                                    }} className="border border-black w-8 h-8 rounded-full flex items-center justify-center">
                                        <span className='material-symbols-outlined'>
                                            remove
                                        </span>
                                    </button>

                                    <p className="text-lg w-8 flex justify-center">
                                        { storedProduct.quant }
                                    </p>

                                    <button onClick={() => handleQuant(product, storedProduct.quant + 1)} className="border border-black w-8 h-8 rounded-full flex items-center justify-center">
                                        <span className='material-symbols-outlined'>
                                            add
                                        </span>
                                    </button>
                                </div>
                            }

                            <button onClick={ () => handleProduct(product) } className="border border-black w-36 justify-center text-black hover:border-red-400 hover:text-red-400 transition-all rounded-sm px-5 py-2 flex items-center gap-3">
                                {
                                    storedProduct ? <>
                                        <span className='material-symbols-outlined'>
                                            close
                                        </span>

                                        { t('menu.remove') }
                                    </> : <>
                                        <span className='material-symbols-outlined'>
                                            shopping_cart
                                        </span>

                                        { t('menu.add') }
                                    </>
                                }
                            </button>
                        </div>
                    </div>
                })
            }

            <div className='mt-10 flex flex-col items-end'>
                <ul className='flex flex-col gap-4'>
                    <li className='text-end flex justify-end items-center gap-3'>
                        { t("menu.product_amount") }: <span className='text-red-500'>{ products.length }</span>
                    </li>

                    <li className='text-end flex justify-end items-center gap-3'>
                        { t("menu.article_count") }: <span className='text-red-500'>{ products.reduce((acc, product) => acc + product.quant, 0) }</span>
                    </li>

                    <li className='text-end flex justify-end items-center gap-3'>
                        { t("menu.iva") }: <span className='text-red-500'>21%</span>
                    </li>

                    <li className='text-end flex justify-end items-center gap-3'>
                        { t("menu.total") }: <span className='text-red-500'>{ Math.round(products.reduce((acc, product) => acc + (product.quant * product.price), 0), 2) }€</span>
                    </li>
                </ul>
            </div>
        </section>
    </div>
}