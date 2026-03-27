import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: {
    background: string;
    text: string;
    textSecondary: string;
    primary: string;
    cardBg: string;
    navBg: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const colors = theme === 'light' 
    ? {
        background: '#fafbf6',
        text: '#31333c',
        textSecondary: '#6b7280',
        primary: '#5fbe86',
        cardBg: '#ffffff',
        navBg: 'rgba(250, 251, 246, 0.9)',
      }
    : {
        background: '#31333c',
        text: '#e5e7eb',
        textSecondary: '#9ca3af',
        primary: '#5fbe86',
        cardBg: '#242630',
        navBg: 'rgba(49, 51, 60, 0.9)',
      };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
