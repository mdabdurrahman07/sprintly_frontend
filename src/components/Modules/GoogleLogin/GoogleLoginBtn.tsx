"use client"
import { useGoogleLogin } from "@/hooks";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const GoogleLoginBtn = () => {
  const router = useRouter();
  const { mutate: googleLogin } = useGoogleLogin();
  const handleGoogleOnSuccess = (credentialResponse: {
    credential?: string;
  }) => {
    const idToken = credentialResponse.credential;
    if (!idToken) {
      toast.error("Google OAuth Failed", {
        description: "Something went wrong. Please try again",
      });
      return;
    }
    googleLogin(
      { idToken },
      {
        onSuccess: () => {
          toast.success("Logged in Successfully", {
            description: "Welcome Back",
          });
          router.push("/");
        },
        onError: (err) => {
          toast.error("Google OAuth Failed", {
            description:
              err.message || "Something went wrong. Please try again",
          });
        },
      },
    );
  };
  const handleGoogleOnError = () => {
    toast.error("Google OAuth Failed", {
      description: "Something went wrong. Please try again",
    });
  };
  return (
    <GoogleLogin
      theme="outline"
      shape="pill"
      text="continue_with"
      onSuccess={handleGoogleOnSuccess}
      onError={handleGoogleOnError}
    />
  );
};

export default GoogleLoginBtn;
