import { useEffect, useState } from "react";
import styles from "./ToggleThemeBtn.module.css";

const ToggleThemeBtn = () => {
  // default theme = dark
  const [isDarkThemeEnabled, setIsDarkThemeEnabled] = useState(true);

  useEffect(() => {
    const userPreference = localStorage.getItem("theme");
    if (userPreference === "light") {
      setIsDarkThemeEnabled(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  function onChangeHandler() {
    setIsDarkThemeEnabled((currState) => {
      const updatedState = !currState;
      const theme = updatedState ? "dark" : "light";
      localStorage.setItem("theme", theme);
      return updatedState;
    });
    document.documentElement.classList.toggle("dark");
  }

  return (
    <label title="Toggle theme" className={styles["toggle-label"]}>
      <input
        className={styles["toggle"]}
        type="checkbox"
        onChange={onChangeHandler}
        checked={!isDarkThemeEnabled}
      />
    </label>
  );
};

export default ToggleThemeBtn;
