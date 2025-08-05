import { Input } from "../../components/@comp/Inputs";
import { Button } from "../../components/@comp/Buttons";
import { useSelector } from "react-redux";
import ProfileInput from "../../components/@comp/ProfileInput";

const Profile = () => {
  const { user, socket } = useSelector((state) => state.auth);

  return (
    <div className="flex items-center justify-center">
      <div className="flex gap-4 flex-col w-2xl mb-20">
        <ProfileInput file={user?.profilePic} />
        <Input label={"Email"} name={"email"} disabled value={user?.email} />
        <Input label={"Name"} name={"name"} disabled value={user?.fullName} />
        <div className="flex items-center gap-2 my-2">
          <div className="flex-grow h-px bg-base-300" />
          <span className="text-xs text-base-content/60">or</span>
          <div className="flex-grow h-px bg-base-300" />
        </div>

        <div>
          <p>
            <span className="font-semibold text-sm">Status :</span>{" "}
            {socket?.connected ? (
              <span className="text-green-500">Active</span>
            ) : (
              <span className="text-red-500">Inactive</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
