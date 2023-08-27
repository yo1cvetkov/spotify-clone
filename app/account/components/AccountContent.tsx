"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";

import useSubscribeModal from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";

import { postData } from "@/libs/helpers";

import Button from "@/components/Button";

interface AccountContentProps {}

export default function AccountContent({}: AccountContentProps) {
  const router = useRouter();
  const subscribeModal = useSubscribeModal();
  const { isLoading, user, subscription } = useUser();

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  async function redirectToCustomerPortal() {
    setLoading(true);

    try {
      const { url, error } = await postData({
        url: "/api/create-portal-link",
      });

      window.location.assign(url);
    } catch (error) {
      if (error) {
        toast.error((error as Error)?.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mb-7 px-6">
      {!subscription && (
        <div className="flex flex-col gap-y-4">
          <p>No active plan</p>
          <Button onClick={subscribeModal.onOpen} className="w-[300px]">
            Subscribe
          </Button>
        </div>
      )}
      {subscription && (
        <div className="flex flex-col gap-y-4">
          <p>
            You are currently on the{" "}
            <b>{subscription?.prices?.products?.name} plan</b>
          </p>
          <Button
            disabled={loading || isLoading}
            onClick={redirectToCustomerPortal}
            className="w-[300px]"
          >
            Open customer portal
          </Button>
        </div>
      )}
    </div>
  );
}
