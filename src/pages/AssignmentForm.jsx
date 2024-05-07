import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDropzone } from "react-dropzone";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../components/Hooks/useAxiosSecure";
import { AuthContext } from "../provider/AuthProvider";
const AssignmentForm = () => {
  // HOOKS
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [marks, setMarks] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [dueDate, setDueDate] = useState(new Date());
  const [creationDate, setCreationDate] = useState(new Date());
  const [image, setImage] = useState("");
  const { user } = useContext(AuthContext);
  const cloudName = "djyzlmzoe";
  const uploadPreset = "vqe3dxyc";
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState("false");
  //FUNCTIONS
  const successAssignmentCreation = () => {
    return toast.success("Assignment created successfully!");
  };

  const axiosSecure = useAxiosSecure();
  const handleImageLinkGenerate = async droppedImage => {
    const formData = new FormData();
    formData.append("file", droppedImage);
    formData.append("upload_preset", uploadPreset);
    formData.append("cloud_name", cloudName);
    try {
      setImage("uploading");
      axios
        .post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formData)
        .then(res => {
          setImage(res.data.secure_url);
          console.log("isUploading:", isUploading);
          // setIsUploading(false);
        })
        .catch(error => console.log(error));
      console.log("image url: ", image);
      console.log("isUploading:", isUploading);
    } catch (err) {
      console.log("error uploading image: ", err);
    } finally {
      console.log("isUploading:", isUploading);
      // setIsUploading("false");
    }
  };
  const handleSubmitMutation = ({ assignmentDetails }) => {
    axiosSecure
      .post("/allAssignments", {
        title,
        description,
        marks,
        difficulty,
        dueDate,
        creationDate,
        image,
        status: "onGoing",
        email: user.email,
        taskAssignee: user.displayName,
      })
      .then(res => {
        console.log("gg", res);
      })
      .catch(error => {
        console.log(error);
      });
    successAssignmentCreation();

    // setTitle("");
    // setDescription("");
    // setMarks("");
    // setDifficulty("easy");
    // setDueDate(new Date());
    // setImage(null)
  };

  const assignmentSubmitMutation = useMutation({
    mutationFn: handleSubmitMutation,
    onSuccess: () => console.log("success mutationfunciton"),
    onError: () => console.log("error at mutationfunciton"),
  });

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      setImage("uploading");
      if (acceptedFiles.length > 0) {
        const droppedImage = acceptedFiles[0];
        handleImageLinkGenerate(droppedImage);
        // setImage(droppedImage);
        console.log("Dropped image:", droppedImage);
      }
      rejectedFiles.forEach(element => {
        console.log("rejected file is :", element);
        setImage("");
      });
    },
    [handleImageLinkGenerate, image]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*, .svg, .ico",
    onDrop,
  });
  const handleSubmit = async e => {
    e.preventDefault();
    console.log(
      "details:",
      title,
      description,
      marks,
      difficulty,
      image,
      dueDate
    );
    const assignmentDetails = {
      title,
      description,
      marks,
      difficulty,
      image,
      dueDate,
    };
    await assignmentSubmitMutation.mutateAsync({ assignmentDetails });
    // Perform form submission or validation logic here
    // You can access form data in the state variables (title, description, marks, etc.)
    // e.target.reset(); we cant use this because we are controlling value by state which is called controlled state;
    setTitle("");
    setDescription("");
    setMarks("");
    setDifficulty("");
    setImage(""); // Reset any other state variables as needed
    setDueDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-8 px-4 md:px-0 md:my-14"
    >
      <Toaster position="top-right" reverseOrder={false} />
      <div className="mb-4">
        <label
          htmlFor="title"
          className="font-roboto block text-sm font-medium text-base-600"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          className="font-roboto mt-1 p-2 w-full border rounded-md text-grey-600"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className="font-roboto block text-sm font-medium text-base-600"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={description}
          required
          onChange={e => setDescription(e.target.value)}
          rows="3"
          className="font-roboto mt-1 p-2 w-full border rounded-md  text-grey-600"
        ></textarea>
      </div>

      <div className="mb-4">
        <label
          htmlFor="marks"
          className="font-roboto block text-sm font-medium text-base-600"
        >
          Marks
        </label>
        <input
          type="number"
          id="marks"
          name="marks"
          value={marks}
          required
          onChange={e => setMarks(e.target.value)}
          className="font-roboto mt-1 p-2 w-full border rounded-md text-grey-600"
        />
      </div>

    

      <div className="mb-4">
        <label
          htmlFor="difficulty"
          className="font-roboto block text-sm font-medium text-base-600"
        >
          Difficulty Level
        </label>
        <select
          id="difficulty"
          name="difficulty"
          value={difficulty}
          required
          onChange={e => setDifficulty(e.target.value)}
          className="font-roboto mt-1 p-2 w-full border rounded-md text-grey-600"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="dueDate"
          className="font-roboto block text-sm font-medium text-base-600"
        >
          Due Date
        </label>
        <DatePicker
          selected={dueDate}
          required
          onChange={date => setDueDate(date)}
          className="mt-1 p-2 w-full border rounded-md text-grey-600"
        />
      </div>
      <div {...getRootProps()} className="border p-8 rounded-md bg-base-100">
        <input {...getInputProps()} name="thumbnail" tabIndex="-1"  />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag & drop any image, or click to select any image</p>
        )}
      </div>

      <div className="w-24">
        {image === "uploading" ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-md my-4"></span>
          </div>
        ) : (
          <div>
            <img src={image} alt="" />
          </div>
        )}
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="font-roboto bg-base-500 text-base p-2 rounded-md px-6 btn-outline border"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AssignmentForm;
