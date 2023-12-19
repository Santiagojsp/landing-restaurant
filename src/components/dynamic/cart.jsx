export default function ShoppingCart() { 
    return <div className="flex flex-col py-10 h-screen w-[400px] bg-white px-10 rounded">
        <h2 className="text-2xl">
            Cesta
        </h2>

        <small className="mt-1 text-red-400">
            Todavía no hay productos en la cesta
        </small>
    </div>
}