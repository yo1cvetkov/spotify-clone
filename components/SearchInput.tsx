"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import qs from "query-string";

import useDebounce from "@/hooks/useDebounce";

import Input from "./Input";

interface SearchInputProps {}

export default function SearchInput({}: SearchInputProps) {
  const router = useRouter();
  const [value, setValue] = React.useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);

  React.useEffect(() => {
    const query = {
      title: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: "/search",
      query,
    });

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <Input
      placeholder="What do you want to listen to ?"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
