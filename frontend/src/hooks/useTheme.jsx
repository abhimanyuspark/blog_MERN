import { useLocalStorage } from "@uidotdev/usehooks";

const useTheme = (initial = null) => {
  const [theme, setTheme] = useLocalStorage("theme", initial);

  return [theme, setTheme];
};

export default useTheme;
