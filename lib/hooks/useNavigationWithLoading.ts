"use client";

import { useRouter } from "@/i18n/routing";
import { useTransition } from "react";

type NavigationHref = Parameters<ReturnType<typeof useRouter>["push"]>[0];

export default function useNavigateWithLoading() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const navigate = (href: NavigationHref) => {
    if (isPending) return;
    startTransition(() => router.push(href));
  };

  return { isPending, navigate };
}
