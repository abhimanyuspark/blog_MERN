import React, { useEffect, useRef } from "react";
import { FaEye, FaEyeSlash, FaRandom } from "react-icons/fa";

const Label = ({ name, label, important }) => {
  return (
    <label
      htmlFor={name}
      className="text-base font-medium cursor-pointer flex gap-2"
    >
      {label}
      {important && <sup className="text-red-500 text-base static">*</sup>}
    </label>
  );
};

const Input = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  random = false,
  autoComplete = "off",
  label,
  error,
  show,
  setShow,
  onRandom,
  important,
  className,
}) => {
  return (
    <div className="relative flex gap-2 flex-col">
      {label && <Label label={label} name={name} important={important} />}

      <div className="flex gap-2 items-center absolute top-1/2 right-2 text-2xl z-50">
        {random && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              onRandom();
            }}
            aria-hidden="true"
            className="cursor-pointer"
          >
            <FaRandom />
          </div>
        )}

        {name === "password" && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setShow(!show);
            }}
            aria-hidden="true"
            className="cursor-pointer"
          >
            {show ? <FaEye /> : <FaEyeSlash />}
          </div>
        )}
      </div>

      <input
        id={name}
        name={name}
        autoComplete={autoComplete}
        type={type}
        value={value}
        placeholder={placeholder}
        className={`${className} w-full input input-primary ${
          error ? "input-error" : ""
        }`}
        onChange={onChange}
      />

      <p className="text-red-500 text-sm">{error}</p>
    </div>
  );
};

const CheckBox = ({
  label,
  indeterminate,
  disabled,
  onChange,
  checked,
  important,
  name,
  className = "",
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <div className={className + " flex gap-2 items-center"}>
      <input
        type="checkbox"
        id={name}
        ref={ref}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={"checkbox checkbox-primary checkbox-lg"}
      />
      {label && <Label label={label} name={name} important={important} />}
    </div>
  );
};

const InputSelect = ({
  value,
  onChange,
  children,
  label,
  name,
  error,
  multiple = false,
  size,
  important,
  className,
}) => {
  return (
    <div className="flex gap-2 flex-col min-w-auto max-w-full">
      {label && <Label important={important} label={label} name={name} />}
      <select
        id={name}
        multiple={multiple}
        size={size}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full select select-primary ${className}`}
      >
        {children}
      </select>

      <p className="text-red-500 text-sm">{error}</p>
    </div>
  );
};

const TextArea = ({
  name,
  value,
  onChange,
  label,
  error,
  important,
  className,
}) => {
  return (
    <div className="flex gap-2 flex-col">
      {label && <Label label={label} name={name} important={important} />}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`${className} w-full textarea-primary textarea textarea-lg ${
          error ? "textarea-error" : ""
        }`}
      ></textarea>
      <p className="text-red-500 text-sm">{error}</p>
    </div>
  );
};

export { CheckBox, InputSelect, Input, TextArea };
