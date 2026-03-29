import { useState, useEffect } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Star, 
  ChevronRight, 
  Menu as MenuIcon, 
  X, 
  ShoppingBag, 
  Clock, 
  MapPin, 
  CheckCircle2,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_CATEGORIES, MENU_ITEMS, REVIEWS, CONTACT_INFO } from './constants';

export default function App() {
  const [activeCategory, setActiveCategory] = useState("Classics");
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15); // Visual Scarcity

  // Exit intent logic
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 0 && !localStorage.getItem('exit_popup_shown')) {
        setShowExitPopup(true);
        localStorage.setItem('exit_popup_shown', 'true');
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  // Scroll logic for navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scarcity timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 60000); // Reduce every minute
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-pizza-black text-white selection:bg-pizza-orange selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-pizza-black/90 backdrop-blur-md py-3 border-b border-white/10' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-6 bg-italian-green rounded-full"></div>
              <div className="w-2 h-6 bg-italian-white rounded-full"></div>
              <div className="w-2 h-6 bg-italian-red rounded-full"></div>
            </div>
            <span className="text-2xl font-display font-extrabold tracking-tighter">BEST PIZZERIA</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#menu" className="hover:text-pizza-orange transition-colors font-medium">Menu</a>
            <a href="#quality" className="hover:text-pizza-orange transition-colors font-medium">Kalite</a>
            <a href="#reviews" className="hover:text-pizza-orange transition-colors font-medium">Yorumlar</a>
            <a 
              href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
              className="bg-pizza-orange hover:bg-pizza-orange/90 text-white px-6 py-2.5 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95"
            >
              <Phone size={18} />
              {CONTACT_INFO.phone}
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-pizza-black pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-2xl font-display font-bold">
              <a href="#menu" onClick={() => setIsMenuOpen(false)}>Menu</a>
              <a href="#quality" onClick={() => setIsMenuOpen(false)}>Kalite</a>
              <a href="#reviews" onClick={() => setIsMenuOpen(false)}>Yorumlar</a>
              <a 
                href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
                className="bg-pizza-orange text-center py-4 rounded-xl mt-4"
              >
                HEMEN ARA
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/pizza-hero/1920/1080?blur=2" 
            alt="Delicious Pizza" 
            className="w-full h-full object-cover opacity-40 scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pizza-black via-pizza-black/60 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20">
              <Zap size={16} className="text-pizza-orange fill-pizza-orange" />
              <span className="text-sm font-bold tracking-wider uppercase">Bir Pizza’dan Daha Ötesi</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-display font-extrabold leading-[0.9] mb-6 tracking-tighter">
              ISTANBUL’UN <span className="text-pizza-orange">EN İNCE</span> HAMURU, EN BOL MALZEMESİ.
            </h1>
            <p className="text-xl md:text-2xl text-white/70 mb-10 max-w-xl leading-relaxed">
              Gerçek İtalyan ruhu, mahallenin sıcaklığıyla buluştu. Her dilimde bir hikaye var.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#menu" 
                className="bg-pizza-orange hover:bg-pizza-orange/90 text-white px-10 py-5 rounded-full font-black text-xl flex items-center justify-center gap-3 transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-pizza-orange/20"
              >
                HEMEN SİPARİŞ VER
                <ChevronRight size={24} />
              </a>
              <div className="flex items-center gap-4 px-6 py-4 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-8 h-8 rounded-full border-2 border-pizza-black" alt="User" />
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex items-center text-yellow-500">
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                  </div>
                  <span className="font-bold">4.9/5</span> (1.2k+ Yorum)
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scarcity Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 right-10 hidden lg:block bg-italian-red/20 backdrop-blur-md border border-italian-red/30 p-6 rounded-2xl"
        >
          <p className="text-xs uppercase tracking-widest font-bold text-italian-red mb-1">Günün Özel Teklifi</p>
          <p className="text-2xl font-display font-bold">Sadece <span className="text-italian-red">{timeLeft}</span> Tepsi Kaldı!</p>
          <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
            <motion.div 
              initial={{ width: "100%" }}
              animate={{ width: `${(timeLeft/15)*100}%` }}
              className="h-full bg-italian-red"
            ></motion.div>
          </div>
        </motion.div>
      </section>

      {/* Platforms Section */}
      <section className="py-12 bg-white/5 border-y border-white/10">
        <div className="container mx-auto px-4">
          <p className="text-center text-white/40 text-sm font-bold uppercase tracking-[0.3em] mb-8">Bizi Buralarda Da Bulabilirsiniz</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
            <span className="text-2xl font-black italic">Yemeksepeti</span>
            <span className="text-2xl font-black italic">Trendyol Yemek</span>
            <span className="text-2xl font-black italic">Getir</span>
          </div>
          <p className="text-center text-pizza-orange text-sm font-bold mt-8">
            * Direkt siparişlerde en iyi fiyat garantisi!
          </p>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-extrabold mb-4">MENÜMÜZÜ KEŞFEDİN</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Her biri özenle seçilmiş malzemelerle, taş fırında pişen lezzetler.</p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {MENU_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-full font-bold transition-all ${activeCategory === cat ? 'bg-pizza-orange text-white shadow-lg shadow-pizza-orange/30 scale-105' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-pizza-orange/50 transition-all hover:shadow-2xl hover:shadow-pizza-orange/10"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    {item.popular && (
                      <div className="absolute top-4 right-4 bg-pizza-orange text-white text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                        <TrendingUp size={12} />
                        EN POPÜLER
                      </div>
                    )}
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-display font-bold">{item.name}</h3>
                      <span className="text-2xl font-display font-black text-pizza-orange">{item.price}</span>
                    </div>
                    <p className="text-white/50 text-sm mb-8 leading-relaxed">{item.description}</p>
                    <button className="w-full py-4 rounded-2xl bg-white/5 hover:bg-pizza-orange text-white font-bold transition-all flex items-center justify-center gap-2 group/btn">
                      <ShoppingBag size={18} />
                      SEPETE EKLE
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section id="quality" className="py-24 bg-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img src="https://picsum.photos/seed/dough/400/600" className="rounded-3xl w-full h-full object-cover mt-12" alt="Dough" referrerPolicy="no-referrer" />
                <img src="https://picsum.photos/seed/veggies/400/600" className="rounded-3xl w-full h-full object-cover" alt="Veggies" referrerPolicy="no-referrer" />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-pizza-orange p-10 rounded-3xl hidden md:block">
                <Award size={48} className="text-white mb-4" />
                <p className="text-4xl font-display font-black">100%</p>
                <p className="text-sm font-bold uppercase tracking-widest">Doğal Malzeme</p>
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-6xl font-display font-extrabold mb-8 leading-tight">KALİTE BİZİM <span className="text-pizza-orange italic">HAMURUMUZDA</span> VAR.</h2>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-16 h-16 bg-italian-green/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="text-italian-green" size={32} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">İncecik, Çıtır Hamur</h4>
                    <p className="text-white/50">24 saat mayalanan, taş fırında hayat bulan efsanevi ince hamurumuzla tanışın.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-16 h-16 bg-italian-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="text-white" size={32} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Taptaze Malzemeler</h4>
                    <p className="text-white/50">Her sabah yerel üreticilerden gelen en taze sebzeler ve kaliteli et ürünleri.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-16 h-16 bg-italian-red/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="text-italian-red" size={32} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Gizli Sos Tarifi</h4>
                    <p className="text-white/50">Nesiller boyu aktarılan, taze domates ve baharatlarla hazırlanan özel sosumuz.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-extrabold mb-4">MÜŞTERİLERİMİZ NE DİYOR?</h2>
            <div className="flex justify-center items-center gap-2 text-yellow-500 mb-2">
              <Star fill="currentColor" />
              <Star fill="currentColor" />
              <Star fill="currentColor" />
              <Star fill="currentColor" />
              <Star fill="currentColor" />
            </div>
            <p className="font-bold">Google Maps'te 4.9/5 Puan</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map(review => (
              <div key={review.id} className="bg-white/5 p-8 rounded-3xl border border-white/10 relative">
                <div className="flex gap-1 text-yellow-500 mb-4">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-lg italic mb-6">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-pizza-orange rounded-full flex items-center justify-center font-bold text-xl">
                    {review.author[0]}
                  </div>
                  <span className="font-bold">{review.author}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/5 pt-24 pb-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-1">
                  <div className="w-2 h-6 bg-italian-green rounded-full"></div>
                  <div className="w-2 h-6 bg-italian-white rounded-full"></div>
                  <div className="w-2 h-6 bg-italian-red rounded-full"></div>
                </div>
                <span className="text-3xl font-display font-extrabold tracking-tighter">BEST PIZZERIA</span>
              </div>
              <p className="text-white/50 max-w-sm mb-8 leading-relaxed">
                Istanbul’un kalbinde, gerçek İtalyan lezzetini mahallenize getiriyoruz. Bir pizza’dan daha fazlasını keşfedin.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-pizza-orange transition-colors cursor-pointer">
                  <span className="font-bold">IG</span>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-pizza-orange transition-colors cursor-pointer">
                  <span className="font-bold">FB</span>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-pizza-orange transition-colors cursor-pointer">
                  <span className="font-bold">TW</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-6">Hızlı Erişim</h4>
              <ul className="space-y-4 text-white/50">
                <li><a href="#menu" className="hover:text-white transition-colors">Menü</a></li>
                <li><a href="#quality" className="hover:text-white transition-colors">Kalite</a></li>
                <li><a href="#reviews" className="hover:text-white transition-colors">Yorumlar</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Hakkımızda</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-6">İletişim</h4>
              <ul className="space-y-4 text-white/50">
                <li className="flex items-center gap-3"><MapPin size={18} className="text-pizza-orange" /> {CONTACT_INFO.address}</li>
                <li className="flex items-center gap-3"><Phone size={18} className="text-pizza-orange" /> {CONTACT_INFO.phone}</li>
                <li className="flex items-center gap-3"><Clock size={18} className="text-pizza-orange" /> 11:00 - 23:00</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/10 text-center text-white/30 text-sm">
            <p>&copy; 2026 Best Pizzeria Istanbul. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>

      {/* Floating Actions */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        <motion.a 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
          target="_blank"
          className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl text-white"
        >
          <MessageCircle size={32} fill="currentColor" />
        </motion.a>
        <motion.a 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
          className="w-14 h-14 bg-pizza-orange rounded-full flex items-center justify-center shadow-2xl text-white"
        >
          <Phone size={28} fill="currentColor" />
        </motion.a>
      </div>

      {/* Exit Intent Popup */}
      <AnimatePresence>
        {showExitPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowExitPopup(false)}
              className="absolute inset-0 bg-pizza-black/80 backdrop-blur-sm"
            ></motion.div>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white text-pizza-black p-10 rounded-[40px] max-w-lg w-full relative z-10 text-center overflow-hidden"
            >
              {/* Italian Accents on Popup */}
              <div className="absolute top-0 left-0 right-0 h-2 flex">
                <div className="flex-1 bg-italian-green"></div>
                <div className="flex-1 bg-italian-white"></div>
                <div className="flex-1 bg-italian-red"></div>
              </div>

              <button 
                onClick={() => setShowExitPopup(false)}
                className="absolute top-6 right-6 text-pizza-black/20 hover:text-pizza-black transition-colors"
              >
                <X size={24} />
              </button>

              <div className="w-24 h-24 bg-pizza-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag size={48} className="text-pizza-orange" />
              </div>
              
              <h3 className="text-3xl font-display font-black mb-2">GİTMEDEN ÖNCE!</h3>
              <p className="text-pizza-black/60 mb-8">İlk siparişine özel %10 indirimi kaçırma. Hemen sipariş ver, lezzeti yakala!</p>
              
              <div className="bg-pizza-black/5 border-2 border-dashed border-pizza-black/10 p-6 rounded-2xl mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-pizza-black/40 mb-1">İndirim Kodu</p>
                <p className="text-4xl font-display font-black tracking-tighter">BEST10</p>
              </div>

              <button 
                onClick={() => setShowExitPopup(false)}
                className="w-full bg-pizza-orange text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-pizza-orange/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                KODU KULLAN & SİPARİŞ VER
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
