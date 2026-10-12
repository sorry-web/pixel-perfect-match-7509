import { createFileRoute } from "@tanstack/react-router";
import { Deck } from "@/components/deck/Deck";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "St Anthony's: The Architecture of School Transformation" },
      { name: "description", content: "An interactive presentation redesigning St Anthony's School through the McKinsey 7-S Framework." },
      { property: "og:title", content: "St Anthony's: The Architecture of School Transformation" },
      { property: "og:description", content: "A 7-S strategy for aligned, sustainable school improvement." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Deck,
});
