import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "@/firebase/config";
import { checkGoogleUser } from "../services/auth.service";
import { useAuth } from "./useAuth";

export const useGoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  async function signInWithGoogle() {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);

      const user = result.user;

      const response = await checkGoogleUser(user.uid, user.email || "");

      if (response.data.exists) {
        login({
          success: true,
          data: {
            token: response.data.token!,
            user: response.data.user!,
          },
        });
        navigate("/dashboard");
        return;
      }

      navigate("/complete-google-register", {
        state: {
          uid: user.uid,
          email: user.email,
          names: user.displayName,
          avatar: user.photoURL,
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    signInWithGoogle,
  };
};
