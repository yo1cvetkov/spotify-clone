"use client";

import { Fragment } from "react";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { toast } from "react-hot-toast";

import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";

import Button from "./Button";
import usePlayer from "@/hooks/usePlayer";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

export default function Header({ children, className }: HeaderProps) {
  const router = useRouter();

  const { onOpen } = useAuthModal();
  const player = usePlayer();

  const supabaseClient = useSupabaseClient();

  const { user } = useUser();

  function handleRouteBack() {
    router.back();
  }

  function handleRouteForward() {
    router.forward();
  }

  async function handleLogout() {
    const { error } = await supabaseClient.auth.signOut();

    player.reset();

    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Successfully logged out!");
    }
  }

  return (
    <div
      className={twMerge(
        "h-fit bg-gradient-to-b from-emerald-800 p-6",
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={handleRouteBack}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretLeft size={35} className="text-white" />
          </button>
          <button
            onClick={handleRouteForward}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretRight size={35} className="text-white" />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <HiHome className="text-black" size={20} />
          </button>
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button onClick={handleLogout} className="bg-white px-6 py-2">
                Logout
              </Button>
              <Button
                onClick={() => router.push("/account")}
                className="bg-white"
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <Fragment>
              <div>
                <Button
                  onClick={onOpen}
                  className="bg-transparent text-neutral-300 font-medium"
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button onClick={onOpen} className="bg-white px-6 py-2">
                  Log in
                </Button>
              </div>
            </Fragment>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
