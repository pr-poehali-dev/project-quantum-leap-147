export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-11 p-6">
      <div className="flex justify-between items-center">
        <div className="text-white text-sm uppercase tracking-widest font-light">✦ Nail Studio</div>
        <nav className="flex gap-6">
          <a href="#portfolio" className="text-white hover:text-pink-200 transition-colors duration-300 uppercase text-xs tracking-wide">Работы</a>
          <a href="#prices" className="text-white hover:text-pink-200 transition-colors duration-300 uppercase text-xs tracking-wide">Цены</a>
          <a href="#schedule" className="text-white hover:text-pink-200 transition-colors duration-300 uppercase text-xs tracking-wide">График</a>
          <a href="#booking" className="text-white hover:text-pink-200 transition-colors duration-300 uppercase text-xs tracking-wide">Запись</a>
        </nav>
      </div>
    </header>
  )
}