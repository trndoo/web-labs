import { useEffect, useState } from 'react';
import Header from './components/Header';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Reviews from './components/Reviews';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  const [theme, setTheme] = useState('light');

  // автоматичний вибір теми за часом: 07:00-21:00 — світла, інакше — темна
  useEffect(() => {
    const hours = new Date().getHours();
    setTheme(hours >= 7 && hours < 21 ? 'light' : 'dark');
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div
      className={`${theme === 'dark' ? 'dark' : ''} min-h-screen flex flex-col bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans transition-colors`}
    >
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main className="flex-1 w-full max-w-3xl mx-auto p-6 flex flex-col gap-6">
        <About />
        <Education />
        <Experience />
        <Reviews />
      </main>
      <Footer />
      <ContactForm />
    </div>
  );
}

export default App;
