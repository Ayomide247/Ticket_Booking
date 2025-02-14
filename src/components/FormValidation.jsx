import { ErrorMessage, Field, Formik } from "formik";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useTicket } from "./TicketContext";
import { PaystackButton } from "react-paystack";

const FormValidation = () => {
  const { ticketStore, setTicketStore } = useTicket();
  const publicKey = "pk_test_30935254e277d16e13b3b46de0616a73647b8f34";

  const bookingBtnRef = useRef(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    message: Yup.string(),
    // .required("Message is required"),
  });
  console.log(ticketStore?.ticket);

  const handleNext = (data) => {
    const { name, email, message } = data?.data;
    return setTicketStore((prevState) => {
      return {
        ...prevState,
        formSteps: 3,
        ticket: {
          ...prevState.ticket,
          user: {
            ...prevState.ticket.user,
            name,
            email,
            message,
          },
        },
      };
    });
  };

  const componentProps = {
    email: ticketStore?.ticket?.user?.email || "bayomide247@gmail.com",
    amount: ticketStore?.ticket?.type?.price?.split("$")?.[1] * 100,
    metadata: {
      name: ticketStore?.ticket?.user?.name,
      // phoneNumber,
    },
    publicKey,
    // text: "Book Now",
    onSuccess: () =>
      handleNext({
        data: {
          name: ticketStore?.ticket?.user?.name,
          email: ticketStore?.ticket?.user?.email,
          message: ticketStore?.ticket?.user?.message,
        },
        step: 3,
      }),
    // localStorage.clear(),
    // navigate("/"),
    // window.location.reload()
    onClose: () => alert("Are you sure you want to close?"),
  };

  return (
    <>
      <Formik
        initialValues={{ name: "", email: "", message: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          const { name, email, message } = values;
          if (ticketStore?.ticket?.user?.photo === "") {
            setTicketStore((prevState) => {
              return {
                ...prevState,
                error: {
                  ...prevState.error,
                  photo: "Photo is required",
                },
              };
            });
            setSubmitting(false);
            return;
          }
          setSubmitting(false);
          if (ticketStore?.ticket?.type?.price?.toLowerCase() === "free") {
            handleNext({ data: { ...values }, step: 3 });
            return;
          }
          bookingBtnRef.current.click();
        }}
      >
        {({ isSubmitting, handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
            className="w-full mx-auto py-6 text-pure shadow-lg rounded-lg space-y-4"
            data-testid="form"
          >
            <div>
              <label>Enter Your Name:</label>
              <Field
                type="text"
                name="name"
                className="mt-1 block w-full p-2 border border-secondary rounded-lg bg-prime active:bg-secondary"
                data-testid="name-field"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
                data-testid="name-error"
              />
            </div>

            <div>
              <label> Enter your email address</label>
              <Field
                type="email"
                name="email"
                placeholder="you@example.com"
                className="mt-1 block w-full p-2 border border-secondary rounded-lg bg-prime active:bg-secondary"
                data-testid="email-field"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
                data-testid="email-error"
              />
            </div>

            <div>
              <label>Message:</label>
              <Field
                as="textarea"
                name="message"
                rows="4"
                className="mt-1 block w-full p-2 border rounded-lg"
                data-testid="message-field"
              />
              <ErrorMessage
                name="message"
                component="div"
                className="text-red-500"
                data-testid="message-error"
              />
            </div>
            <section className="flex w-full gap-5 mt-5">
              <button
                type="button"
                className="border border-secondary w-full cursor-pointer text-lightPrimary py-2 rounded-lg hover:bg-lightPrimary hover:text-pure transition ease-in duration-500 hover:scale-105"
                data-testid="cancel-button"
                onClick={() => {
                  setTicketStore((prevState) => {
                    return {
                      ...prevState,
                      formSteps: 1,
                    };
                  });
                }}
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="text-center border border-secondary w-full cursor-pointer text-lightPrimary py-2 rounded-lg hover:bg-lightPrimary hover:text-pure transition ease-in duration-500 hover:scale-105"
                data-testid="submit-button"
                // onClick={() => {
                //   bookingBtnRef.current.click();
                // }}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </section>
          </form>
        )}
      </Formik>
      <PaystackButton
        className=""
        {...componentProps}
        children={
          <span
            className="text-white font-semibold cursor-pointer hidden"
            ref={bookingBtnRef}
          >
            Free Book Now
          </span>
        }
        // onClick={handleClick()}
      />
    </>
  );
};

export default FormValidation;
