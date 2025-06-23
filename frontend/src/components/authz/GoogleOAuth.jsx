import { GoogleOAuthProvider } from "@react-oauth/google";
import { Outlet } from "react-router";
const client_Id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const GoogleAuth = () => {
  return (
    <GoogleOAuthProvider clientId={client_Id}><Outlet /></GoogleOAuthProvider>
  );
};

export default GoogleAuth