import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import "./newsletter.scss";

function Newsletter() {
  const [email, setEmail] =
    useState<string>("");

  const handleNewsletterSubmit = (
    e: FormEvent<HTMLFormElement>
  ): void => {
    e.preventDefault();

    console.log(email);

    setEmail("");
  };

  const handleEmailChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    setEmail(e.target.value);
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-container container">

        <div className="newsletter-content">

          <h2>Stay Updated</h2>

          <p>
            Subscribe to our newsletter and be
            the first to know about exclusive
            offers, new arrivals, and exciting
            deals.
          </p>

          <form
            onSubmit={handleNewsletterSubmit}
            className="newsletter-form"
          >

            <input
              type="email"
              required
              name="email"
              placeholder="Enter your email"
              className="newsletter-input"
              value={email}
              onChange={handleEmailChange}
            />

            <button
              type="submit"
              className="button"
            >
              Subscribe
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}

export default Newsletter;