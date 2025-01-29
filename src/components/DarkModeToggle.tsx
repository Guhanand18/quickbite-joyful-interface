import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleDarkMode}
      className="ml-4"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
};

export default DarkModeToggle;