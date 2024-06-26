import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaPhoneSquare } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import ReactiveButton from 'reactive-button';
const ContactUs = () => {
  const axiosSecure = useAxiosSecure();
  const successToast = () =>
    toast.success(`Thanks for reaching out!
   We'll respond promptly.`);
  const unsuccessToast = () =>
    toast.error("Couldn't send email.Try again,Please.");
  const handleContactUs = e => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const subject = form.subject.value;
    const description = form.description.value;
    axiosSecure
      .post("/emailSend", {
        email: email,
        subject: subject,
        description: description,
      })
      .then((res) => {
        console.log(res)
        successToast();
        form.reset()
      })
      .catch(() => {
        unsuccessToast();
      });

    console.log(email, subject, description);
  };

  return (
    <div className="grid grid-cols-1 py-16 md:grid-cols-2 px-4 md:px-8 lg:px-0">
      <Toaster></Toaster>
      <div className="py-8 md:py-0">
        <div>
          <h1 className="font-raleway text-4xl font-bold mb-10">
            Get in touch with us!
          </h1>
        </div>
        <div className="[&>*]:my-6">
          <div className="flex gap-4 items-center justify-start">
            <IoMdMail className="w-8 h-8"></IoMdMail>
            <p className="font-roboto">isaahmedshan190138@gmail.com</p>{" "}
          </div>
          <div className="flex gap-4 items-center justify-start">
            <FaPhoneSquare className="w-8 h-8"></FaPhoneSquare>
            <p className="font-roboto">+880 1625337883</p>
          </div>
          <div className="flex gap-4 items-center justify-start">
            <FaLocationDot className="w-8 h-8"></FaLocationDot>{" "}
            <p className="font-roboto">Khalishpur,Khulna</p>
          </div>
        </div>
      </div>
      <div>
        <div className="mb-8">
          <h3 className="font-raleway text-4xl font-bold">Contact Us!</h3>
        </div>
        <form onSubmit={handleContactUs}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-base-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@gmail.com"
              //   value={title}
              //   onChange={e => setTitle(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md text-grey-600"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-base-600"
            >
              Subject
            </label>
            <input
              type="subject"
              id="subject"
              name="subject"
              placeholder="Subject"
              //   value={title}
              //   onChange={e => setTitle(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md text-grey-600"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-base-600"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              placeholder="Enter your message or description..."
              //   value={title}
              //   onChange={e => setTitle(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md text-grey-600"
            />
          </div>
          <ReactiveButton type="submit" width={100} color="light" size="large" idleText={"Send"} style={{borderRadius:'6px'}} outline />
          {/* <button
            className="btn bg-base-300 btn-normal md:btn-wide"
            type="submit"
          >
            Submit
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
