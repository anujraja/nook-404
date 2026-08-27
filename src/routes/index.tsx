import { createFileRoute } from "@tanstack/react-router";
import { ObliquePage } from "@/components/oblique-page";

export const Route = createFileRoute("/")({ component: ObliquePage });
