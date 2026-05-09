export default function HeroContent() {
  return (
    <main className="absolute bottom-8 left-8 z-20 max-w-lg">
      <div className="text-left">
        <div
          className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-4 relative"
          style={{ filter: "url(#glass-effect)" }}
        >
          <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
          <span className="text-white/90 text-xs font-light relative z-10">Маникюр · Педикюр · Уход за ногтями</span>
        </div>

        <h1 className="font-display text-6xl md:text-7xl leading-none tracking-tight text-white mb-5">
          <span className="italic font-light">Ногти</span> вашей
          <br />
          <span className="font-light">мечты</span>
        </h1>

        <p className="text-xs font-light text-white/60 mb-6 leading-relaxed max-w-sm">
          Маникюр, педикюр, наращивание и дизайн. Запись онлайн или по телефону.
        </p>

        <div className="flex items-center gap-3 flex-wrap">
          <a href="#portfolio" className="px-7 py-2.5 rounded-full bg-transparent border border-white/25 text-white/80 font-light text-xs tracking-wide transition-all duration-300 hover:bg-white/8 hover:border-white/50 hover:text-white cursor-pointer">
            Мои работы
          </a>
          <a href="#booking" className="px-7 py-2.5 rounded-full bg-white/95 text-pink-900 font-medium text-xs tracking-wide transition-all duration-300 hover:bg-white cursor-pointer shadow-lg shadow-pink-900/20">
            Записаться
          </a>
        </div>
      </div>
    </main>
  )
}