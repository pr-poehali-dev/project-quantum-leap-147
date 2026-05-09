import ShaderBackground from "@/components/ShaderBackground"
import HeroContent from "@/components/HeroContent"
import PulsingCircle from "@/components/PulsingCircle"
import Header from "@/components/Header"
import Icon from "@/components/ui/icon"

const portfolioItems = [
  { id: 1, label: "Французский маникюр", color: "bg-pink-100" },
  { id: 2, label: "Гель-лак с дизайном", color: "bg-rose-200" },
  { id: 3, label: "Наращивание ногтей", color: "bg-pink-200" },
  { id: 4, label: "Педикюр с покрытием", color: "bg-red-100" },
  { id: 5, label: "Градиент омбре", color: "bg-fuchsia-100" },
  { id: 6, label: "Арт-дизайн", color: "bg-rose-100" },
]

const prices = [
  { service: "Маникюр классический", price: "от 800 ₽" },
  { service: "Маникюр + гель-лак", price: "от 1 500 ₽" },
  { service: "Наращивание ногтей", price: "от 2 500 ₽" },
  { service: "Коррекция наращивания", price: "от 1 800 ₽" },
  { service: "Педикюр классический", price: "от 1 200 ₽" },
  { service: "Педикюр + гель-лак", price: "от 1 800 ₽" },
  { service: "Снятие покрытия", price: "от 300 ₽" },
  { service: "Дизайн (1 ноготь)", price: "от 100 ₽" },
]

const schedule = [
  { day: "Понедельник", time: "10:00 – 19:00" },
  { day: "Вторник", time: "10:00 – 19:00" },
  { day: "Среда", time: "10:00 – 19:00" },
  { day: "Четверг", time: "10:00 – 20:00" },
  { day: "Пятница", time: "10:00 – 20:00" },
  { day: "Суббота", time: "10:00 – 18:00" },
  { day: "Воскресенье", time: "Выходной" },
]

const Index = () => {
  return (
    <div>
      {/* Hero Section */}
      <ShaderBackground>
        <Header />
        <HeroContent />
        <PulsingCircle />
      </ShaderBackground>

      {/* Portfolio Section */}
      <section id="portfolio" className="bg-[#1a0a12] py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <span className="text-pink-400 text-xs uppercase tracking-widest">Примеры работ</span>
            <h2 className="text-4xl font-light text-white mt-2">
              <span className="italic font-medium">Портфолио</span>
            </h2>
            <p className="text-white/50 text-sm mt-3 max-w-md">
              Каждая работа — это забота о деталях и любовь к красоте
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {portfolioItems.map((item) => (
              <div key={item.id} className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer">
                <div className={`w-full h-full ${item.color} flex items-end p-4 transition-transform duration-500 group-hover:scale-105`}>
                  <span className="text-pink-900/80 text-xs font-medium">{item.label}</span>
                </div>
                <div className="absolute inset-0 bg-pink-900/0 group-hover:bg-pink-900/20 transition-colors duration-300 rounded-2xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prices Section */}
      <section id="prices" className="bg-[#120008] py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <span className="text-pink-400 text-xs uppercase tracking-widest">Стоимость услуг</span>
            <h2 className="text-4xl font-light text-white mt-2">
              <span className="italic font-medium">Прайс-лист</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {prices.map((item, i) => (
              <div key={i} className="flex justify-between items-center py-4 px-6 rounded-xl border border-white/5 bg-white/3 hover:bg-white/5 transition-colors duration-200">
                <span className="text-white/80 text-sm">{item.service}</span>
                <span className="text-pink-300 text-sm font-medium">{item.price}</span>
              </div>
            ))}
          </div>
          <p className="text-white/30 text-xs mt-6 text-center">
            Точную стоимость уточняйте при записи — цена зависит от сложности работы
          </p>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="bg-[#1a0a12] py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <span className="text-pink-400 text-xs uppercase tracking-widest">Часы работы</span>
            <h2 className="text-4xl font-light text-white mt-2">
              <span className="italic font-medium">График</span>
            </h2>
          </div>
          <div className="max-w-md">
            {schedule.map((item, i) => (
              <div key={i} className={`flex justify-between items-center py-4 border-b border-white/5 ${item.time === "Выходной" ? "opacity-40" : ""}`}>
                <span className="text-white/70 text-sm">{item.day}</span>
                <span className={`text-sm font-medium ${item.time === "Выходной" ? "text-white/40" : "text-pink-300"}`}>
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="bg-[#120008] py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <span className="text-pink-400 text-xs uppercase tracking-widest">Онлайн-запись</span>
            <h2 className="text-4xl font-light text-white mt-2">
              <span className="italic font-medium">Записаться</span>
            </h2>
            <p className="text-white/50 text-sm mt-3">
              Выберите удобный способ — позвоните или оставьте заявку
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
            {/* Phone */}
            <a href="tel:+79991234567" className="group flex items-center gap-4 p-6 rounded-2xl border border-white/10 bg-white/3 hover:bg-white/8 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                <Icon name="Phone" size={20} className="text-pink-300" />
              </div>
              <div>
                <div className="text-white/40 text-xs uppercase tracking-wide mb-1">Позвонить</div>
                <div className="text-white text-lg font-light group-hover:text-pink-200 transition-colors">+7 (999) 123-45-67</div>
              </div>
            </a>

            {/* Online form */}
            <div className="p-6 rounded-2xl border border-pink-500/30 bg-pink-500/5">
              <div className="text-white/40 text-xs uppercase tracking-wide mb-4">Заявка онлайн</div>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-pink-400/50 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Номер телефона"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-pink-400/50 transition-colors"
                />
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/70 text-sm focus:outline-none focus:border-pink-400/50 transition-colors appearance-none">
                  <option value="" className="bg-[#120008]">Выберите услугу</option>
                  <option value="manicure" className="bg-[#120008]">Маникюр</option>
                  <option value="pedicure" className="bg-[#120008]">Педикюр</option>
                  <option value="nails" className="bg-[#120008]">Наращивание</option>
                </select>
                <button className="w-full py-3 rounded-xl bg-pink-500 hover:bg-pink-400 text-white text-sm font-medium transition-colors duration-200 cursor-pointer">
                  Отправить заявку
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0d0008] py-8 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="text-white/30 text-xs">✦ Nail Studio · Маникюр и педикюр</div>
          <div className="text-white/20 text-xs">© 2024</div>
        </div>
      </footer>
    </div>
  )
}

export default Index
