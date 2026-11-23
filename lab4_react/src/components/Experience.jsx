function Experience() {
  return (
    <section className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border-2 border-slate-200 dark:border-slate-700 p-6 hover:scale-105 hover:shadow-xl transition duration-200">
      <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-3 pb-1 border-b-2 border-rose-500">
        Навчальний досвід
      </h2>
      <article className="space-y-3 text-slate-700 dark:text-slate-300">
        <p>
          Проведення симуляції аудиту інформаційної безпеки (ISO 27001) для компанії «Mojang Studio»
          Створення власної першої HTML-сторінки з резюме.
        </p>
        <p>
          Мій профіль GitHub:{' '}
          <a
            href="https://github.com/trndoo"
            target="_blank"
            rel="noreferrer"
            className="text-indigo-600 dark:text-indigo-300 font-medium hover:text-indigo-800 dark:hover:text-indigo-200 hover:underline"
          >
            https://github.com/trndoo
          </a>
        </p>
      </article>
    </section>
  );
}

export default Experience;
