import { useEffect, useState } from 'react';

const VARIANT = 15;

const UK_REVIEWS = [
  { name: 'Софія Гриценко', email: 'sofiia.hrytsenko@example.com', body: 'Вікторія уважно вивчала вимоги до безпеки та чітко оформила висновки аудиту. Усі домовленості виконувала в строк і без нагадувань.' },
  { name: 'Богдан Левицький', email: 'bohdan.levytskyi@example.com', body: 'Цікавий співрозмовник і сумлінна студентка. Швидко розібралася з Git, а її коміти були зрозумілими й акуратними.' },
  { name: 'Наталя Гнатюк', email: 'natalia.hnatiuk@example.com', body: 'Під час практики вона самостійно налаштувала віртуальну мережу та детально описала кожен крок. Було видно, що їй справді цікава тема.' },
  { name: 'Роман Савчук', email: 'roman.savchuk@example.com', body: 'Спокійна, організована й комунікабельна. Не боялася просити допомоги, а отримавши пораду, одразу застосовувала її на практиці.' },
  { name: 'Юлія Попович', email: 'yuliia.popovych@example.com', body: 'Зробила для нас просту, але охайну сторінку-візитку. Рекомендую як розсудливу та відповідальну початківицю в ІТ.' }
];

function Reviews() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false; // захист від оновлення стану після демонтування

    fetch(`https://jsonplaceholder.typicode.com/posts/${VARIANT}/comments`)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then(data => {
        if (!ignore) setComments(data);
      })
      .catch(err => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []); // [] — виконати один раз при монтуванні

  return (
    <section className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border-2 border-slate-200 dark:border-slate-700 p-6">
      <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-3 pb-1 border-b-2 border-amber-500">
        Відгуки роботодавців
      </h2>

      {loading && <p className="text-slate-600 dark:text-slate-400">Завантаження…</p>}
      {error && <p className="text-red-600">Не вдалося завантажити відгуки: {error}</p>}

      <div className="space-y-3">
        {comments.map((comment, index) => {
          const uk = UK_REVIEWS[index % UK_REVIEWS.length];
          return (
          <article
            key={comment.id}
            className="rounded-lg border border-slate-200 dark:border-slate-600 p-4 hover:shadow-md transition"
          >
            <h3 className="font-semibold capitalize text-slate-800 dark:text-slate-100">
              {uk.name}
            </h3>
            <p className="text-sm text-indigo-600 dark:text-indigo-300">{uk.email}</p>
            <p className="mt-2 text-slate-700 dark:text-slate-300">{uk.body}</p>
          </article>
          );
        })}
      </div>
    </section>
  );
}

export default Reviews;
