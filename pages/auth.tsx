import Input from "@/components/input";
import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaTwitter } from "react-icons/fa";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");
  const [loading, setLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    toast.remove();
    try {
      setLoading(true);
      toast.loading("loading... 👻");
      const response = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });
      toast.remove();
      if (response?.ok) {
        toast.success("Welcome Back to Netflix 🤗.");
      }
      if (response?.error) {
        toast.error(response.error);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    toast.remove();
    try {
      setLoading(true);
      const response = await axios.post("/api/register", {
        email,
        name,
        password,
      });
      if (response.status === 200) {
        login();
        toast.success("Welcome to Netflix. 😎🤩");
      }
      setLoading(false);
    } catch (err) {
      console.log(err);

      setLoading(false);
    }
  }, [email, name, password]);

  return (
    <div className="relative h-full w-full bg-[url('../public/images/hero.jpg')] bg-center bg-no-repeat bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  type="text"
                  label="Username"
                  id="name"
                  onChange={(e: any) => setName(e.target.value)}
                  value={name}
                />
              )}

              <Input
                type="email"
                label="Email"
                id="email"
                onChange={(e: any) => setEmail(e.target.value)}
                value={email}
              />
              <Input
                type="password"
                label="Password"
                id="password"
                onChange={(e: any) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <button
              type="button"
              className="bg-red-600 py-3 duration-100 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
              onClick={() => {
                variant === "login" ? login() : register();
              }}
            >
              {!loading
                ? variant === "login"
                  ? "Login"
                  : "Sign up"
                : "Signing up..."}
            </button>
            <div className="flex items-center flex-row gap-4 mt-8 justify-center">
              <div
                onClick={() =>
                  signIn("google", {
                    callbackUrl: "/profiles",
                  })
                }
                className="w-10 h-10 hover:opacity-70 transition bg-white rounded-full p-1 flex items-center justify-center cursor-pointer"
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                className="w-10 h-10 bg-white rounded-full p-1 flex items-center justify-center cursor-pointer"
              >
                <FaGithub color="black" size={30} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account!"}
              <span
                onClick={() => toggleVariant()}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
