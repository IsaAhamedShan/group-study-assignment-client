import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { format } from "date-fns";
import { AuthContext } from "../../provider/AuthProvider";
const AssignmentUpdateForm = ({ data }) => {
  console.log("updatedetails: ", data);
  // const {title,description,marks,difficulty,dueDate,creationDate,image,title} = updateDetails
  // HOOKS
  const [title, setTitle] = useState();
  const [description, setDescription] = useState("");
  const [marks, setMarks] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [dueDate, setDueDate] = useState(new Date());
  const [image, setImage] = useState(null);
  const { user } = useContext(AuthContext);
  const cloudName = "djyzlmzoe";
  const uploadPreset = "vqe3dxyc";

  useEffect(() => {
    if (data) {
      setTitle(data.title || "");
      setDescription(data.description || "");
      setMarks(data.marks || "");
      setDifficulty(data.difficulty || "");
      setImage(data.image || "");
    }
  }, [data]);

  //FUNCTIONS
  const successAssignmentCreation = () => {
    toast.success("Assignment created successfully!");
  };
  const handleImageLinkGenerate = async droppedImage => {
    const formData = new FormData();
    formData.append("file", droppedImage);
    formData.append("upload_preset", uploadPreset);
    formData.append("cloud_name", cloudName);

    axios
      .post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formData)
      .then(res => setImage(res.data.secure_url))
      .catch(error => console.log(error));

    console.log("image url: ", image);
  };
  const handleSubmitMutation = ({ assignmentDetails }) => {
    axios
      .patch(`http://localhost:5000/assignmentUpdate/${data._id}`, {
        title,
        description,
        marks,
        difficulty,
        dueDate,
        image,
      })
      .then(res => {
        console.log(res);
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
      if (acceptedFiles.length > 0) {
        const droppedImage = acceptedFiles[0];
        handleImageLinkGenerate(droppedImage);
        // setImage(droppedImage);
        console.log("Dropped image:", droppedImage);
      }
      rejectedFiles.forEach(element => {
        console.log("rejected file is :", element);
      });
    },
    [image]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
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
  };

  return (
    <form className="max-w-lg mx-auto mt-8">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-base-600"
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
          value={description}
          required
          onChange={e => setDescription(e.target.value)}
          rows="3"
          className="mt-1 p-2 w-full border rounded-md  text-grey-600"
        ></textarea>
      </div>

      <div className="mb-4">
        <label
          htmlFor="marks"
          className="block text-sm font-medium text-base-600"
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
          className="mt-1 p-2 w-full border rounded-md text-grey-600"
        />
      </div>

      {/* <div className="mb-4">
        <label htmlFor="thumbnailUrl" className="block text-sm font-medium text-base-600">
          Thumbnail Image URL
        </label>
        <input
          type="text"
          id="thumbnailUrl"
          name="thumbnailUrl"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md text-grey-600"
        />
      </div>  */}

      <div className="mb-4">
        <label
          htmlFor="difficulty"
          className="block text-sm font-medium text-base-600"
        >
          Difficulty Level
        </label>
        <select
          id="difficulty"
          name="difficulty"
          value={difficulty}
          required
          onChange={e => setDifficulty(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md text-grey-600"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="dueDate"
          className="block text-sm font-medium text-base-600"
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
        <input {...getInputProps()} required />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag & drop any image, or click to select any image</p>
        )}
      </div>
      <div className="w-24">
        {image ? (
          <div>
            <img src={image} alt="" />
          </div>
        ) : null}
      </div>

      <div className="mt-6">
        <button
          onClick={handleSubmit}
          type="submit"
          className="bg-base-500 text-base p-2 rounded-md px-6 btn-outline border"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AssignmentUpdateForm;
