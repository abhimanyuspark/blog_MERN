import { useState } from "react";
import { Label } from "./Inputs";
import { FiX } from "react-icons/fi";

const TagInput = ({ tags, onChange, label = "Tags", name = "tags" }) => {
  const [input, setInput] = useState("");
  const [focus, setFocus] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      onChange([...tags, input.trim()]);
      setInput("");
    } else if (e.key === "Backspace" && input === "") {
      const newTags = tags.slice(0, -1);
      onChange(newTags);
    }
  };

  const onDelete = (index) => {
    const newTags = tags.filter((_, i) => {
      return index !== i;
    });
    onChange(newTags);
  };

  return (
    <div className="flex flex-col gap-2">
      <div>
        <Label name={name} label={label} />
      </div>
      <div
        className={`${
          focus ? "outline-2 outline-primary outline-offset-2" : ""
        } border border-primary rounded w-full py-2 px-2 bg-base-100`}
      >
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((t, i) => (
            <span
              className="badge badge-primary py-2.5 px-2 rounded flex items-center gap-1"
              key={i}
            >
              #{t}
              <FiX
                className="cursor-pointer ml-1"
                onClick={() => {
                  onDelete(i);
                }}
              />
            </span>
          ))}
          <input
            type="text"
            id={name}
            name={name}
            value={input}
            onFocus={() => {
              setFocus(true);
            }}
            onBlur={() => {
              setFocus(false);
            }}
            className="flex-1 min-w-[100px] outline-none bg-transparent p-0"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
};

export default TagInput;
