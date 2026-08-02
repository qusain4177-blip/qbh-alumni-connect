import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin_/login")({
  component: () => <div>hello admin login</div>,
});
