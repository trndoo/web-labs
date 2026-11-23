function Education() {
  return (
    <section className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border-2 border-slate-200 dark:border-slate-700 p-6 hover:scale-105 hover:shadow-xl transition duration-200">
      <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-3 pb-1 border-b-2 border-emerald-500">
        Освіта
      </h2>
      <ul className="space-y-2 text-slate-700 dark:text-slate-300">
        <li>
          <strong className="text-slate-900 dark:text-white">Університет:</strong> Національний університет «Львівська політехніка» (2025 – 2029)
        </li>
        <li>
          <strong className="text-slate-900 dark:text-white">Спеціальність:</strong> Кібербезпека та захист інформації
        </li>
      </ul>
    </section>
  );
}

export default Education;