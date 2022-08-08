import { useState } from "react";
import { toast } from "react-toastify";
import { sendRegistrationEmail } from "../../../utils/firebase/firebase.utils";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleRegistration = async (e) => {
    e.preventDefault();

    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    try {
      await sendRegistrationEmail(email, config);

      toast.success(
        `Email sent to ${email}. Click the link to complete your account registration.`
      );
      // save user email in local storage
      window.localStorage.setItem(
        "emailForRegistration",
        JSON.stringify({ name, email })
      );
    } catch (error) {
      toast.error(
        `Error while sending registration email. Error message: ${error.message}`
      );
    }
    setName("");
    setEmail("");
  };

  return (
    <>
      <form className="me-3 ms-2 mt-5" onSubmit={handleRegistration}>
        <h4>Don't have an account?</h4>
        <p className="mb-5">Let's begin with your name and email.</p>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="name"
            name="name"
            id="name"
            className="form-control"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="row mt-4">
          <div className="col d-grid gap-2 col-xs-12 col-lg-6">
            <button
              type="submit"
              className="btn btn-secondary"
              disabled={!email || !name}
            >
              REGISTER
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
