import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const ADMIN_USER = "admin_123";
const ADMIN_PASS = "admin 123";

const USERS = [
  { id: 1, name: "Максим", tag: "#0420", avatar: "М", status: "online", color: "#57f287" },
  { id: 2, name: "Соня", tag: "#1337", avatar: "С", status: "online", color: "#57f287" },
  { id: 3, name: "Даниил", tag: "#9999", avatar: "Д", status: "idle", color: "#faa61a" },
  { id: 4, name: "Катя", tag: "#0001", avatar: "К", status: "dnd", color: "#ed4245" },
  { id: 5, name: "Арсений", tag: "#7777", avatar: "А", status: "offline", color: "#72767d" },
];

const MESSAGES = [
  { id: 1, user: "Максим", avatar: "М", color: "#5865f2", text: "Ребят, кто уже попробовал новый клиент? 🔥", time: "Сегодня в 14:23", delay: 0 },
  { id: 2, user: "Соня", avatar: "С", color: "#eb459e", text: "Да! Стекло просто шикарное, всё такое плавное", time: "Сегодня в 14:24", delay: 200 },
  { id: 3, user: "Даниил", avatar: "Д", color: "#57f287", text: "Анимации звонков — отдельный кайф 😍", time: "Сегодня в 14:25", delay: 400 },
  { id: 4, user: "Катя", avatar: "К", color: "#faa61a", text: "Когда релиз? Хочу показать всем!", time: "Сегодня в 14:26", delay: 600 },
];

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeChannel, setActiveChannel] = useState("общий");
  const [callActive, setCallActive] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [adminLogin, setAdminLogin] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [bannedUsers, setBannedUsers] = useState<number[]>([]);
  const [screamUsers, setScreamUsers] = useState<number[]>([]);
  const [shakeScreen, setShakeScreen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [typingVisible, setTypingVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setTypingVisible(v => !v), 3000);
    return () => clearInterval(t);
  }, []);

  const showNotif = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogin = () => {
    if (adminLogin === ADMIN_USER && adminPassword === ADMIN_PASS) {
      setIsAdmin(true);
      setLoginOpen(false);
      setAdminOpen(true);
      setLoginError(false);
      showNotif("Добро пожаловать, Администратор!");
    } else {
      setLoginError(true);
    }
  };

  const handleBan = (userId: number, name: string) => {
    setBannedUsers(prev => [...prev, userId]);
    showNotif(`🔨 ${name} забанен!`);
  };

  const handleScream = (userId: number, name: string) => {
    setScreamUsers(prev => [...prev, userId]);
    setShakeScreen(true);
    showNotif(`😱 Скример запущен для ${name}!`);
    setTimeout(() => setShakeScreen(false), 1000);
    setTimeout(() => setScreamUsers(prev => prev.filter(id => id !== userId)), 3000);
  };

  const handleKick = (name: string) => {
    showNotif(`👢 ${name} кикнут с сервера!`);
  };

  const handleMute = (name: string) => {
    showNotif(`🔇 ${name} замьючен на 10 минут!`);
  };

  return (
    <div className={`min-h-screen gradient-bg text-white overflow-x-hidden ${shakeScreen ? "animate-[shake_0.5s_ease-in-out]" : ""}`}
      style={shakeScreen ? { animation: "call-bounce 0.1s ease-in-out 5" } : {}}>

      {/* Фоновые orb-шары */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#5865f2] opacity-10 blur-3xl animate-orb-drift" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#eb459e] opacity-8 blur-3xl animate-orb-drift" style={{ animationDelay: "3s" }} />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 rounded-full bg-[#57f287] opacity-6 blur-3xl animate-orb-drift" style={{ animationDelay: "6s" }} />
      </div>

      {/* Уведомление */}
      {notification && (
        <div className="fixed top-6 right-6 z-[100] glass-card px-5 py-3 text-white font-medium animate-notification-pop shadow-2xl border border-white/20">
          {notification}
        </div>
      )}

      {/* Навигация */}
      <nav className="glass-nav sticky top-0 z-50 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 gradient-accent rounded-xl flex items-center justify-center animate-pulse-glow">
              <Icon name="Zap" size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold shimmer-text">NexCord</h1>
              <p className="text-xs text-white/40 hidden sm:block">Discord нового поколения</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <Button
              variant="ghost"
              className="text-white/60 hover:text-white hover:bg-white/10 text-sm"
              onClick={() => isAdmin ? setAdminOpen(true) : setLoginOpen(true)}
            >
              <Icon name="Shield" size={15} className="mr-1.5" />
              {isAdmin ? "Панель" : "Войти"}
            </Button>
            <button
              onClick={() => setCallActive(!callActive)}
              className="gradient-accent px-5 py-2 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#5865f2]/30"
            >
              Скачать
            </button>
          </div>
          <Button
            variant="ghost"
            className="sm:hidden text-white/60 hover:text-white hover:bg-white/10 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
        {mobileMenuOpen && (
          <div className="sm:hidden mt-3 pt-3 border-t border-white/10 flex flex-col gap-2">
            <Button variant="ghost" className="text-white/60 hover:text-white hover:bg-white/10 justify-start text-sm"
              onClick={() => isAdmin ? setAdminOpen(true) : setLoginOpen(true)}>
              <Icon name="Shield" size={15} className="mr-2" />
              {isAdmin ? "Панель администратора" : "Войти как админ"}
            </Button>
            <button className="gradient-accent px-5 py-2.5 rounded-xl text-white text-sm font-semibold">Скачать</button>
          </div>
        )}
      </nav>

      {/* === HERO секция === */}
      <section className="relative z-10 px-4 py-16 sm:py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-white/70 mb-8 animate-slide-up">
            <span className="w-2 h-2 rounded-full bg-[#57f287] animate-pulse-green inline-block" />
            Бета уже доступна · 12,400 пользователей
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-6 animate-slide-up delay-100 leading-tight">
            Discord, каким он <br />
            <span className="shimmer-text">должен быть</span>
          </h1>
          <p className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto mb-10 animate-slide-up delay-200 leading-relaxed">
            NexCord — это Discord с эффектом стекла, живыми анимациями и уникальными фишками, которых нет нигде.
          </p>
          <div className="flex flex-wrap gap-4 justify-center animate-slide-up delay-300">
            <button className="gradient-accent px-8 py-4 rounded-2xl text-white font-bold text-lg hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-[#5865f2]/40 flex items-center gap-2">
              <Icon name="Download" size={20} />
              Скачать бесплатно
            </button>
            <button className="glass px-8 py-4 rounded-2xl text-white font-bold text-lg hover:bg-white/10 transition-all flex items-center gap-2">
              <Icon name="Play" size={20} />
              Смотреть демо
            </button>
          </div>
        </div>
      </section>

      {/* === ДЕМО Discord интерфейса === */}
      <section className="relative z-10 px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card overflow-hidden shadow-2xl shadow-black/40 animate-slide-up delay-500">
            <div className="flex h-[520px]">

              {/* Боковая панель серверов */}
              <div className="w-16 glass-sidebar flex flex-col items-center py-3 gap-2 hidden sm:flex">
                <div className="w-10 h-10 gradient-accent rounded-2xl hover:rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer animate-pulse-glow">
                  <Icon name="Zap" size={18} className="text-white" />
                </div>
                <div className="w-6 h-px bg-white/10 rounded-full my-1" />
                {["🎮", "🎨", "💻", "🚀"].map((emoji, i) => (
                  <div key={i} className="w-10 h-10 glass rounded-3xl hover:rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer hover:bg-[#5865f2]/40 text-base">
                    {emoji}
                  </div>
                ))}
              </div>

              {/* Каналы */}
              <div className="w-52 glass-sidebar flex flex-col hidden md:flex">
                <div className="p-3 border-b border-white/5 flex items-center justify-between">
                  <span className="text-white font-semibold text-sm">NexCord HQ</span>
                  <Icon name="ChevronDown" size={14} className="text-white/40" />
                </div>
                <div className="flex-1 p-2 overflow-y-auto">
                  <div className="mb-3">
                    <p className="text-white/30 text-xs font-bold uppercase tracking-widest px-2 mb-1">Текстовые</p>
                    {["общий", "новости", "фишки", "помощь", "off-topic"].map((ch) => (
                      <div key={ch}
                        onClick={() => setActiveChannel(ch)}
                        className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg cursor-pointer transition-all text-sm ${activeChannel === ch ? "bg-white/15 text-white" : "text-white/40 hover:text-white/70 hover:bg-white/5"}`}>
                        <Icon name="Hash" size={14} />
                        {ch}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-white/30 text-xs font-bold uppercase tracking-widest px-2 mb-1">Голосовые</p>
                    {["Лобби", "Игры", "Музыка"].map((ch) => (
                      <div key={ch}
                        className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg cursor-pointer text-white/40 hover:text-white/70 hover:bg-white/5 transition-all text-sm">
                        <Icon name="Volume2" size={14} />
                        {ch}
                        {ch === "Музыка" && (
                          <div className="ml-auto flex items-end gap-px h-3">
                            {[1,2,3,4,5].map(i => (
                              <div key={i} className="w-0.5 bg-[#57f287] rounded-full waveform-bar" style={{ height: "4px" }} />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                {/* User area */}
                <div className="p-2 border-t border-white/5 flex items-center gap-2">
                  <div className="relative">
                    <div className="w-8 h-8 gradient-accent rounded-full flex items-center justify-center text-white text-sm font-bold">Ю</div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#57f287] border-2 border-transparent animate-pulse-green" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-semibold truncate">nexcord_user</p>
                    <p className="text-white/30 text-xs">#0001</p>
                  </div>
                  <Icon name="Settings" size={14} className="text-white/30 hover:text-white cursor-pointer" />
                </div>
              </div>

              {/* Чат */}
              <div className="flex-1 flex flex-col">
                {/* Шапка чата */}
                <div className="h-12 glass-dark border-b border-white/5 flex items-center px-4 gap-2">
                  <Icon name="Hash" size={16} className="text-white/40" />
                  <span className="text-white font-semibold text-sm">{activeChannel}</span>
                  <div className="w-px h-4 bg-white/10 mx-2" />
                  <span className="text-white/40 text-xs hidden sm:block">Добро пожаловать в NexCord!</span>
                  <div className="ml-auto flex items-center gap-3">
                    <Icon name="Bell" size={16} className="text-white/40 hover:text-white cursor-pointer" />
                    <Icon name="Users" size={16} className="text-white/40 hover:text-white cursor-pointer" />
                    <Icon name="Search" size={16} className="text-white/40 hover:text-white cursor-pointer" />
                  </div>
                </div>

                {/* === ЗВОНОК === */}
                {callActive && (
                  <div className="mx-4 mt-3 glass-card p-3 flex items-center gap-3 border border-[#57f287]/30">
                    <div className="relative">
                      <div className="w-10 h-10 gradient-accent rounded-full flex items-center justify-center text-white font-bold animate-call-bounce">
                        М
                      </div>
                      <div className="absolute inset-0 rounded-full border-2 border-[#57f287] animate-call-ring" />
                      <div className="absolute inset-0 rounded-full border-2 border-[#57f287] animate-call-ring" style={{ animationDelay: "0.5s" }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-semibold">Входящий звонок</p>
                      <p className="text-[#57f287] text-xs">Максим · NexCord Call</p>
                    </div>
                    <button onClick={() => setCallActive(false)}
                      className="w-9 h-9 rounded-xl bg-[#57f287] flex items-center justify-center hover:bg-[#3ba55d] transition-all">
                      <Icon name="Phone" size={16} className="text-white" />
                    </button>
                    <button onClick={() => setCallActive(false)}
                      className="w-9 h-9 rounded-xl bg-[#ed4245] flex items-center justify-center hover:bg-[#c03537] transition-all">
                      <Icon name="PhoneOff" size={16} className="text-white" />
                    </button>
                  </div>
                )}

                {/* Сообщения */}
                <div className="flex-1 p-4 space-y-2 overflow-y-auto">
                  {MESSAGES.map((msg) => (
                    <div key={msg.id}
                      className="glass-message p-3 flex gap-3 group animate-message-slide"
                      style={{ animationDelay: `${msg.delay}ms` }}>
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                        style={{ background: msg.color }}>
                        {msg.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 mb-0.5">
                          <span className="text-white font-semibold text-sm" style={{ color: msg.color }}>{msg.user}</span>
                          <span className="text-white/30 text-xs">{msg.time}</span>
                        </div>
                        <p className="text-white/80 text-sm leading-relaxed">{msg.text}</p>
                      </div>
                    </div>
                  ))}

                  {/* Typing indicator */}
                  {typingVisible && (
                    <div className="flex items-center gap-2 px-2 py-1 animate-fade-in">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/40 inline-block typing-dot-1" />
                        <span className="w-1.5 h-1.5 rounded-full bg-white/40 inline-block typing-dot-2" />
                        <span className="w-1.5 h-1.5 rounded-full bg-white/40 inline-block typing-dot-3" />
                      </div>
                      <span className="text-white/40 text-xs"><strong className="text-white/60">Соня</strong> печатает...</span>
                    </div>
                  )}
                </div>

                {/* Поле ввода */}
                <div className="px-4 pb-4">
                  <div className="glass flex items-center gap-3 px-4 py-3 rounded-2xl">
                    <Icon name="Plus" size={18} className="text-white/30 hover:text-white cursor-pointer" />
                    <span className="text-white/30 text-sm flex-1">Написать в #{activeChannel}</span>
                    <Icon name="Smile" size={18} className="text-white/30 hover:text-white cursor-pointer" />
                    <Icon name="Gift" size={18} className="text-white/30 hover:text-white cursor-pointer" />
                  </div>
                </div>
              </div>

              {/* Список участников */}
              <div className="w-52 glass-sidebar hidden lg:flex flex-col">
                <div className="p-3 border-b border-white/5">
                  <p className="text-white/30 text-xs font-bold uppercase tracking-widest">Участники — {USERS.length}</p>
                </div>
                <div className="p-2 space-y-0.5 overflow-y-auto flex-1">
                  <p className="text-white/20 text-xs uppercase tracking-widest px-2 pt-1 pb-1">В сети — {USERS.filter(u => u.status !== "offline").length}</p>
                  {USERS.map(user => (
                    <div key={user.id}
                      className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all cursor-pointer ${bannedUsers.includes(user.id) ? "opacity-30" : "hover:bg-white/5"} ${screamUsers.includes(user.id) ? "animate-call-bounce" : ""}`}>
                      <div className="relative flex-shrink-0">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{ background: user.color + "44", border: `1px solid ${user.color}33` }}>
                          {user.avatar}
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-transparent"
                          style={{ background: user.status === "online" ? "#57f287" : user.status === "idle" ? "#faa61a" : user.status === "dnd" ? "#ed4245" : "#72767d" }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-medium truncate ${bannedUsers.includes(user.id) ? "line-through text-white/30" : "text-white/70"}`}>
                          {user.name}
                          {bannedUsers.includes(user.id) && " [БАН]"}
                        </p>
                        <p className="text-white/20 text-xs truncate">{user.tag}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Кнопка демо-звонка */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setCallActive(!callActive)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105 active:scale-95 ${callActive ? "bg-[#ed4245] hover:bg-[#c03537] text-white" : "bg-[#57f287] hover:bg-[#3ba55d] text-black"}`}>
              <Icon name={callActive ? "PhoneOff" : "Phone"} size={16} />
              {callActive ? "Завершить демо-звонок" : "Показать анимацию звонка"}
            </button>
          </div>
        </div>
      </section>

      {/* === ФИЧИ === */}
      <section className="relative z-10 px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black mb-3">
              Почему <span className="shimmer-text">NexCord</span>?
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">Всё то же самое, что вы любите — но красивее, быстрее, лучше.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "Layers", color: "#5865f2", title: "Glass UI", desc: "Полностью стеклянный интерфейс с глубиной и размытием. Каждый элемент живёт." },
              { icon: "Zap", color: "#57f287", title: "Живые анимации", desc: "Звонки, сообщения, статусы — всё анимировано плавно и красиво." },
              { icon: "Phone", color: "#eb459e", title: "Анимация звонков", desc: "Пульсирующие кольца при входящих звонках. Сразу понятно, что происходит." },
              { icon: "MessageCircle", color: "#faa61a", title: "Анимация чата", desc: "Сообщения появляются с анимацией. Индикатор печатания как живой." },
              { icon: "Shield", color: "#ed4245", title: "Админ-панель", desc: "Мощные инструменты модерации прямо внутри клиента. Бан одним кликом." },
              { icon: "Sparkles", color: "#9b59b6", title: "Уникальные фишки", desc: "То, чего нет в обычном Discord. Скримеры, эффекты, сюрпризы." },
            ].map(({ icon, color, title, desc }) => (
              <div key={title} className="glass-card p-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: color + "22", border: `1px solid ${color}44` }}>
                  <Icon name={icon} size={22} style={{ color }} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === МОДАЛЬНОЕ ОКНО ЛОГИНА === */}
      {loginOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="glass-card p-8 w-full max-w-sm mx-4 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 gradient-accent rounded-xl flex items-center justify-center">
                <Icon name="Shield" size={18} className="text-white" />
              </div>
              <div>
                <h2 className="text-white font-bold text-lg">Вход для администратора</h2>
                <p className="text-white/40 text-xs">Только для авторизованных лиц</p>
              </div>
            </div>
            <div className="space-y-3 mb-4">
              <input
                type="text"
                placeholder="Логин"
                value={adminLogin}
                onChange={e => setAdminLogin(e.target.value)}
                className="w-full glass px-4 py-3 rounded-xl text-white placeholder-white/30 text-sm outline-none focus:border-[#5865f2]/60 transition-all"
              />
              <input
                type="password"
                placeholder="Пароль"
                value={adminPassword}
                onChange={e => setAdminPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                className="w-full glass px-4 py-3 rounded-xl text-white placeholder-white/30 text-sm outline-none focus:border-[#5865f2]/60 transition-all"
              />
              {loginError && <p className="text-[#ed4245] text-xs text-center">Неверный логин или пароль</p>}
            </div>
            <div className="flex gap-3">
              <button onClick={() => { setLoginOpen(false); setLoginError(false); }}
                className="flex-1 glass py-2.5 rounded-xl text-white/60 text-sm hover:bg-white/10 transition-all">
                Отмена
              </button>
              <button onClick={handleLogin}
                className="flex-1 gradient-accent py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-all">
                Войти
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === АДМИН ПАНЕЛЬ === */}
      {adminOpen && isAdmin && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-md">
          <div className="glass-card p-6 w-full max-w-2xl mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#ed4245]/20 border border-[#ed4245]/40 rounded-xl flex items-center justify-center">
                  <Icon name="Shield" size={18} className="text-[#ed4245]" />
                </div>
                <div>
                  <h2 className="text-white font-black text-xl">Панель Администратора</h2>
                  <p className="text-[#57f287] text-xs font-medium">admin_123 · Суперадмин</p>
                </div>
              </div>
              <button onClick={() => setAdminOpen(false)}
                className="w-8 h-8 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-all">
                <Icon name="X" size={16} className="text-white/60" />
              </button>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { label: "Пользователей", value: USERS.length, color: "#5865f2" },
                { label: "Забанено", value: bannedUsers.length, color: "#ed4245" },
                { label: "В сети", value: USERS.filter(u => u.status !== "offline").length, color: "#57f287" },
              ].map(({ label, value, color }) => (
                <div key={label} className="glass p-4 rounded-xl text-center">
                  <p className="text-2xl font-black" style={{ color }}>{value}</p>
                  <p className="text-white/40 text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            {/* Список пользователей */}
            <h3 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-3">Управление пользователями</h3>
            <div className="space-y-2">
              {USERS.map(user => (
                <div key={user.id}
                  className={`glass p-4 rounded-xl flex items-center gap-3 transition-all ${bannedUsers.includes(user.id) ? "opacity-40" : ""}`}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                    style={{ background: user.color + "44" }}>
                    {user.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm">{user.name}</p>
                    <p className="text-white/40 text-xs">{user.tag} · {user.status}</p>
                  </div>
                  {!bannedUsers.includes(user.id) ? (
                    <div className="flex gap-2 flex-wrap justify-end">
                      <button onClick={() => handleMute(user.name)}
                        className="px-3 py-1.5 rounded-lg bg-[#faa61a]/20 border border-[#faa61a]/30 text-[#faa61a] text-xs font-medium hover:bg-[#faa61a]/30 transition-all">
                        🔇 Мут
                      </button>
                      <button onClick={() => handleKick(user.name)}
                        className="px-3 py-1.5 rounded-lg bg-[#eb459e]/20 border border-[#eb459e]/30 text-[#eb459e] text-xs font-medium hover:bg-[#eb459e]/30 transition-all">
                        👢 Кик
                      </button>
                      <button onClick={() => handleScream(user.id, user.name)}
                        className="px-3 py-1.5 rounded-lg bg-[#9b59b6]/20 border border-[#9b59b6]/30 text-[#9b59b6] text-xs font-medium hover:bg-[#9b59b6]/30 transition-all">
                        😱 Скример
                      </button>
                      <button onClick={() => handleBan(user.id, user.name)}
                        className="px-3 py-1.5 rounded-lg bg-[#ed4245]/20 border border-[#ed4245]/30 text-[#ed4245] text-xs font-medium hover:bg-[#ed4245]/30 transition-all">
                        🔨 Бан
                      </button>
                    </div>
                  ) : (
                    <span className="px-3 py-1.5 rounded-lg bg-[#ed4245]/10 text-[#ed4245] text-xs font-medium">Заблокирован</span>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => { setAdminOpen(false); setIsAdmin(false); setBannedUsers([]); setScreamUsers([]); }}
              className="mt-6 w-full glass py-2.5 rounded-xl text-white/50 text-sm hover:bg-white/5 transition-all">
              Выйти из панели
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 glass-nav px-6 py-6 mt-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 gradient-accent rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={14} className="text-white" />
            </div>
            <span className="text-white font-bold">NexCord</span>
            <span className="text-white/30 text-sm">· Discord нового поколения</span>
          </div>
          <p className="text-white/20 text-sm">© 2026 NexCord. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;