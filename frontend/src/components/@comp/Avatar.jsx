import { Logo } from "../../assets";

const Avatar = ({ author, className, size = 40 }) => {
  const avatarSize = {
    width: size,
    height: size,
    minWidth: size,
    minHeight: size,
    maxWidth: size,
    maxHeight: size,
  };

  return (
    <div
      className={`rounded-full overflow-hidden ${className || ""}`}
      style={avatarSize}
    >
      <img
        className="size-full object-cover"
        src={author?.profilePic || Logo}
        onError={(e) => (e.currentTarget.src = Logo)}
        alt="avatar"
      />
    </div>
  );
};

export default Avatar;
