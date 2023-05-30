import React, { useState } from "react";
import DNavbar from "./DNavbar";
import swal from "sweetalert";
function Feedback() {
  const [email, setEmail] = useState("");
  const [rating, setrating] = useState("");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email, rating, message, feedback };
    fetch("http://localhost:5000/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Success") {
          swal("Good job!", "Your feedback is submitted!", "success");
        } else {
          swal("Error!", "Your feedback is not submitted!", "error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    e.target.reset();
  };

  return (
    <div>
      <DNavbar />
      <section class="bg-white  my-6">
        <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-black">
            Feedback
          </h2>
          <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-800 sm:text-xl">
            Got a technical issue? Want to send feedback about a beta feature?
          </p>
          <form onSubmit={handleSubmit} method="POST">
            <div>
              <label
                for="email"
                class="block my-3 text-sm font-medium text-black "
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                class="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:placeholder-gray-600 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="name@gmail.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                for="subject"
                class="block my-3 text-sm font-medium text-black"
              >
                Give me reating out of 5
              </label>
              <input
                type="number"
                id="subject"
                name="subject"
                class="block p-3 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500  dark:placeholder-gray-600 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="Type number hear"
                required
                onChange={(e) => setrating(e.target.value)}
              />
            </div>
            <div class="sm:col-span-2">
              <label
                for="message"
                class="block my-3 text-sm font-medium text-black"
              >
                Message (optional)
              </label>
              <textarea
                id="message"
                rows="6"
                name="message"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500  dark:placeholder-gray-700 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Leave a comment..."
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <div class="sm:col-span-2">
              <label
                for="message"
                class="block mb-2 my-3 text-sm font-medium text-black"
              >
                If your mail is not spam then also it show samp when you send it
                so type this mail hear .
              </label>
              <textarea
                id="message"
                rows="6"
                name="message"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500  dark:placeholder-gray-700 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Leave a comment..."
                onChange={(e) => setFeedback(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 my-3 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            >
              Send message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Feedback;
