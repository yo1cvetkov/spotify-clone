"use client";

import { BounceLoader } from "react-spinners";

import Box from "@/components/Box";

interface loadingProps {}

export default function Loading({}: loadingProps) {
  return (
    <Box className="h-full flex items-center justify-center">
      <BounceLoader color="#22c55e" size={40} />
    </Box>
  );
}
