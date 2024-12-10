import SignIn from "@/components/SignIn";
import useSignIn from "@/hooks/useSignIn";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";

jest.mock("react-router-native", () => ({
  __esModule: true,
  useNavigate: jest.fn(() => jest.fn()),
}));

jest.mock("@/hooks/useSignIn", () => {
  const signInMock = jest.fn(); // Move the mock inside
  return {
    __esModule: true,
    default: jest.fn(() => [signInMock]),
  };
});

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      render(<SignIn />);

      const [signInMock] = useSignIn();

      const email = "kalle";
      const password = "password";

      const emailInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");
      const submitButton = screen.getByText("Sign Up");

      fireEvent.changeText(emailInput, email);
      fireEvent.changeText(passwordInput, password);
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(signInMock).toHaveBeenCalledWith({
          username: email,
          password,
        });
      });
    });
  });
});
