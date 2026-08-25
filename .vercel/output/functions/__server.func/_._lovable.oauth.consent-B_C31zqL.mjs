import { j as jsxRuntimeExports } from "./_libs/react.mjs";
const SplitErrorComponent = ({
  error
}) => /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-md px-6 py-16 text-center", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl text-navy", children: "Could not load authorization" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: String(error?.message ?? error) })
] });
export {
  SplitErrorComponent as errorComponent
};
