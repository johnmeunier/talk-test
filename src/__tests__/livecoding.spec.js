import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
describe("insert new items in the todo app", () => {
  test("insert 1 item", async () => {
    render(<App />);
    const input = screen.getByLabelText(/Add/i);
    userEvent.type(input, "Groceries");
    userEvent.click(screen.getByRole("button", { name: "+" }));

    await waitFor(() =>
      expect(screen.getByText(/Groceries/i)).toBeInTheDocument()
    );
  });
});
