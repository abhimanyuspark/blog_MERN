import useTheme from "../../hooks/useTheme";
import { themesData } from "../../utils/constants";

const Theme = () => {
  const [theme, setTheme] = useTheme(themesData[1]);

  return (
    <label className="flex items-center justify-between capitalize">
      Theme - {theme}{" "}
      <input
        checked={theme === themesData[1]}
        type="checkbox"
        onChange={(e) => {
          const value = e.target.checked ? themesData[1] : themesData[0];
          setTheme(value);
        }}
        className="toggle"
      />
    </label>
  );
};

export default Theme;
