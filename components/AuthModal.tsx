"use client";

import * as React from "react";

import { useRouter } from "next/navigation";
import {
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import useAuthModal from "@/hooks/useAuthModal";

import Modal from "./Modal";

interface AuthModalProps {}

export default function AuthModal({}: AuthModalProps) {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { session } = useSessionContext();

  const { onClose, isOpen } = useAuthModal();

  React.useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  function handleChange(open: boolean) {
    if (!open) {
      onClose();
    }
  }

  return (
    <Modal
      title="Welcome back"
      description="Log in to your account"
      isOpen={isOpen}
      onChange={handleChange}
    >
      <Auth
        theme="dark"
        magicLink
        providers={["github"]}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#22c55e",
              },
            },
          },
        }}
      />
    </Modal>
  );
}
