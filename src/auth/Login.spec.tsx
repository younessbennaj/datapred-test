import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import { Login } from "./Login";
import { fetchApi } from "../requests/fetchApi";
import { BrowserRouter } from "react-router-dom";
import { ReactNode } from "react";
import * as router from "react-router";
import { vi } from "vitest";

describe("Login", () => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    return <BrowserRouter>{children}</BrowserRouter>;
  };

  const navigate = vi.fn();

  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(fetchApi);
    vi.spyOn(router, "useNavigate").mockImplementation(() => navigate);
    mock.onGet("/auth/").reply(200, "token");
  });

  it("should render login form", () => {
    render(<Login />, { wrapper: Wrapper });
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it("should login", async () => {
    render(<Login />, {
      wrapper: Wrapper,
    });
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });
    waitFor(() => {
      fireEvent.change(usernameInput, { target: { value: "user" } });
      fireEvent.change(passwordInput, { target: { value: "password" } });
      fireEvent.click(loginButton);

      expect(mock.history.get.length).toBe(1);
      expect(localStorage.getItem("token")).toBe("token");
      expect(navigate).toHaveBeenCalledWith("/");
    });
  });
});
