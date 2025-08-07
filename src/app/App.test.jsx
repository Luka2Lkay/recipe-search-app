import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../app/state/store.js";
import { vi } from "vitest";
import App from "./App";

describe("App component", () => {
  beforeAll(() => {
    vi.mock("../app/components/search-page/SearchPage.jsx", () => {
      return {
        default: () => (
          <div data-testid="mock-search-page"> Mock Search Page Component</div>
        ),
      };
    });
  });

  it("should render the SearchPage component", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByTestId("mock-search-page")).toBeInTheDocument();
  });
});
