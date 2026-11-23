import { useEffect, useState } from 'react';

function Footer() {
  const [info, setInfo] = useState({});

  useEffect(() => {
    // 1. Зчитуємо дані про систему та браузер
    const data = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      vendor: navigator.vendor,
      language: navigator.language,
      languages: (navigator.languages || []).join(', '),
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      hardwareConcurrency: navigator.hardwareConcurrency,
      screen: `${screen.width}x${screen.height}`,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    // 2. Зберігаємо в localStorage (лише рядки)
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        localStorage.setItem(key, String(value));
      }
    });

    // 3. Зчитуємо все з localStorage і кладемо в стан для відображення
    const stored = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      stored[key] = localStorage.getItem(key);
    }
    setInfo(stored);
  }, []);

  return (
    <footer className="bg-slate-800 dark:bg-slate-950 text-slate-300 text-sm p-4 mt-6">
      <p className="text-center">&copy; 2026 Вікторія Натинка. КБ-202. Лабораторна робота №4</p>

      <details className="max-w-3xl mx-auto mt-3">
        <summary className="cursor-pointer text-center hover:text-white">
          Інформація про систему та браузер (localStorage)
        </summary>
        <dl className="mt-2 text-xs">
          {Object.entries(info).map(([key, value]) => (
            <div key={key} className="mb-1">
              <dt className="font-bold text-indigo-300">{key}</dt>
              <dd className="break-all">{value}</dd>
            </div>
          ))}
        </dl>
      </details>
    </footer>
  );
}

export default Footer;
