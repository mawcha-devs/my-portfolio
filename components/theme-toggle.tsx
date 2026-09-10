'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false);
  const [theme, setTheme] = React.useState<
    'dark' | 'light'
  >('dark');

  React.useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem(
      'portfolio-theme',
    );
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    const nextTheme =
      savedTheme === 'light' || savedTheme === 'dark'
        ? savedTheme
        : systemPrefersDark
          ? 'dark'
          : 'light';

    document.documentElement.classList.toggle(
      'light',
      nextTheme === 'light',
    );
    document.documentElement.classList.toggle(
      'dark',
      nextTheme === 'dark',
    );
    setTheme(nextTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle(
      'light',
      nextTheme === 'light',
    );
    document.documentElement.classList.toggle(
      'dark',
      nextTheme === 'dark',
    );
    localStorage.setItem('portfolio-theme', nextTheme);
    setTheme(nextTheme);
  };

  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      aria-label="Toggle color theme"
      onClick={toggleTheme}
      className="min-w-[88px]"
    >
      {mounted
        ? theme === 'dark'
          ? 'Light'
          : 'Dark'
        : 'Theme'}
    </Button>
  );
}
