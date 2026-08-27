import { createFileRoute } from "@tanstack/react-router";
import { NookPage } from "@/components/nook-page";

export const Route = createFileRoute("/")({ component: NookPage });
