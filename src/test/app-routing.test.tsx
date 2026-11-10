import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter, matchRoutes } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Keep tests offline: a signed-out Supabase auth client.
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null } }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
    },
  },
}));

import { routes } from "@/router";

const renderAt = (path: string) =>
  render(<RouterProvider router={createMemoryRouter(routes, { initialEntries: [path] })} />);

describe("App routing", () => {
  beforeEach(() => window.localStorage.clear());

  it.each(["/", "/app", "/sign-in", "/sign-up"])(
    "matches a page for %s instead of the 404",
    (path) => {
      const leaf = matchRoutes(routes, path)?.at(-1);
      expect(leaf?.route.path).toBe(path);
    },
  );

  it("renders the 404 page for unknown paths", () => {
    renderAt("/nope");
    expect(screen.getByText("Page not found")).toBeInTheDocument();
  });

  it("renders sign-in and sign-up modes", () => {
    renderAt("/sign-up");
    expect(screen.getByRole("heading", { name: "建立帳號" })).toBeInTheDocument();
  });

  it("redirects /app to /sign-in when signed out", async () => {
    renderAt("/app");
    expect(await screen.findByRole("heading", { name: "歡迎回來" })).toBeInTheDocument();
  });

  it("redirects the old /auth URL to /sign-in", async () => {
    renderAt("/auth");
    expect(await screen.findByRole("heading", { name: "歡迎回來" })).toBeInTheDocument();
  });
});
