import { useEffect, useState } from 'react';

const FORMSPREE_URL = 'https://formspree.io/f/moeepnyw';

function ContactForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (sessionStorage.getItem('feedbackClosed')) return;

    const timer = setTimeout(() => setIsOpen(true), 60000);
    return () => clearTimeout(timer); // очищення при демонтуванні
  }, []);

  const close = () => {
    setIsOpen(false);
    sessionStorage.setItem('feedbackClosed', 'true');
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const form = event.target;
    setStatus('Надсилання…');

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setStatus('Дякуємо! Повідомлення надіслано.');
        form.reset();
        setTimeout(close, 2000);
      } else {
        setStatus('Помилка надсилання. Спробуйте ще раз.');
      }
    } catch {
      setStatus('Помилка мережі. Спробуйте ще раз.');
    }
  };

  const inputClass =
    'mt-1 w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 p-2 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500';

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-xl bg-white dark:bg-slate-800 p-6 shadow-2xl"
          >
            <h2 className="mb-4 text-2xl font-semibold text-slate-800 dark:text-slate-100">
              Зворотний зв'язок
            </h2>

            <form action={FORMSPREE_URL} method="POST" onSubmit={handleSubmit} className="space-y-3">
              <label className="block font-medium text-slate-700 dark:text-slate-300">
                Ім'я
                <input type="text" name="name" required className={inputClass} />
              </label>
              <label className="block font-medium text-slate-700 dark:text-slate-300">
                Email
                <input type="email" name="email" required className={inputClass} />
              </label>
              <label className="block font-medium text-slate-700 dark:text-slate-300">
                Номер телефону
                <input type="tel" name="phone" required className={inputClass} />
              </label>
              <label className="block font-medium text-slate-700 dark:text-slate-300">
                Повідомлення
                <textarea name="message" rows="4" required className={inputClass} />
              </label>

              <p role="status" className="min-h-6 text-sm text-slate-700 dark:text-slate-300">
                {status}
              </p>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition"
                >
                  Надіслати
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="rounded-md bg-slate-500 px-4 py-2 text-white hover:bg-slate-600 transition"
                >
                  Закрити
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ContactForm;
