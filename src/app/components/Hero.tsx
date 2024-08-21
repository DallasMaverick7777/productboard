export default function Hero () {
    return (
        <section>
                 <h1 className="text-4xl my-12 font-bold text-center">
                 Quick solutions
     </h1>
     <p className="text-center text-gray-600 mt-2">
     Large selection of used Iphone, Samsung and Huawei mobile phones. 24-hour express delivery by the courier of your choice. Reliable and transparent quality control. 100% customer oriented attitude.
     </p>
     <form className="flex gap-2 mt-4 max-w-md mx-auto">
        <input type="search" 
        className="border border-gray-400 py-2 px-3 rounded-md w-full p-2" 
        placeholder="Search device.." />
        <button className="bg-blue-600 text-white py-2 px-4 rounded-md">
            Search
        </button>
     </form>
        </section>
    )
}