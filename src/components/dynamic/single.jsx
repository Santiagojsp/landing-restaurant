export default function SingleProduct({
    product, products, setProducts, handleProduct, handleQuant, storedProduct
}) {
    return <div className="flex py-3 items-center border-b border-dotted">
        <div className="flex-1 flex flex-wrap items-center justify-end gap-5">
            <article className='flex items-center flex-wrap gap-5 w-full lg:w-auto lg:flex-1'>
                <img src={ product.image } className="w-full md:w-16 md:h-16 p-3 rounded-md select-none cursor-pointer" />

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
            </article>

            <section className='flex items-center justify-center w-full md:w-auto gap-5'>
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

                <button onClick={ () => handleProduct(product) } className="border border-black w-full md:w-36 justify-center text-black hover:border-red-400 hover:text-red-400 transition-all rounded-sm px-5 py-2 flex items-center gap-3">
                    {
                        storedProduct ? <>
                            <span className='material-symbols-outlined'>
                                close
                            </span>
                        </> : <>
                            <span className='material-symbols-outlined'>
                                shopping_cart
                            </span>
                        </>
                    }
                </button>
            </section>
        </div>
    </div>
}