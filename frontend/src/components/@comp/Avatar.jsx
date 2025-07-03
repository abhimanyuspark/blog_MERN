import { Logo } from "../../assets";

const Avatar = ({ author }) => {
  return (
    <div className="rounded-full size-10 overflow-hidden">
      <img
        className="size-full object-contain"
        src={author?.profilePic || Logo}
        onError={(e) => (e.currentTarget.src = Logo)}
      />
    </div>
  );
};

export default Avatar;
