function Header({ theme, onToggleTheme }) {
  return (
    <header className="flex flex-col items-center bg-indigo-700 dark:bg-slate-800 text-white px-6 py-10 shadow-lg">
      <h1 className="text-3xl md:text-5xl font-bold tracking-wide mb-4 text-center">
        Натинка Вікторія Романівна
      </h1>
      <p className="text-base md:text-lg opacity-90 text-center">
        Email:{' '}
        <a
          href="mailto:viktoriia.natynka.kb.2025@lpnu.ua"
          className="underline hover:text-amber-300"
        >
          viktoriia.natynka.kb.2025@lpnu.ua
        </a>{' '}
        | Телефон:{' '}
        <a href="tel:+380931953905" className="underline hover:text-amber-300">
          +380931953905
        </a>
      </p>
      <button
        type="button"
        onClick={onToggleTheme}
        className="mt-5 px-5 py-2 rounded-full border-2 border-white hover:bg-white/20 transition"
      >
        {theme === 'dark' ? '☀️ Денна тема' : '🌙 Нічна тема'}
      </button>
    </header>
  );
}

export default Header;
