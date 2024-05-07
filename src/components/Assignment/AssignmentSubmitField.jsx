import axios from "axios";
import { useCallback, useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosSecure from "../Hooks/useAxiosSecure";
const AssignmentSubmitField = ({assignmentDetails}) =>{
  const {_id,description,difficulty,dueDate,email,image,marks,taskAssignee,title} = assignmentDetails;
const {user} = useContext(AuthContext)
    const cloudName = "djyzlmzoe";
    const uploadPreset = "vqe3dxyc";
    // const {title,email,username} = assignmentDetails
    console.log('assignmentDetails: ', assignmentDetails)
    const [pdfFile, setPdfFile] = useState('');
    const alreadySubmittedAssignment = ()=>{toast.error("Assignment already submitted")}
    const axiosSecure = useAxiosSecure()
    const successSubmit = ()=>{toast.success("Assignment Submit Success!")}
    const handleSubmit=()=>{
      const gettingMark = 0
      const count = 0
      axiosSecure.post('/allAssignmentSubmitList',{
            name: user.displayName,
            email:user.email,
            assignment_id:_id,
            description,
            difficulty,
            task_assignee_email:email,
            image,
            submitted_Assignment:pdfFile,
            marks,
            task_assignee_name:taskAssignee,
            title,
            dueDate,
            status:'pending',
            gettingMark,
            count
        })
        .then(res=>{
            console.log("res of submission: ", res)
            successSubmit()
            // setSubmit(true)

        })
        .catch(error=>{
            if(error.response.status == 400){
                alreadySubmittedAssignment()
            }
            console.log("handle Submit Error: ", error.response.status)
        })
    }
    const handlePdfLinkGenerate = async droppedPdfFile => {
      const formData = new FormData();
      formData.append("file", droppedPdfFile);
      formData.append("upload_preset", uploadPreset);
      formData.append("cloud_name", cloudName);
      console.log("form data:", formData);
      axios
        .post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formData)
        .then(res => {
          setPdfFile(res.data.secure_url);
          console.log("the link is :", res.data.secure_url);
        })
        .catch(error => console.log(error));
    };
    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
      if (acceptedFiles.length > 0) {
        const droppedPdfFile = acceptedFiles[0];
        console.log("dropped pdf:", droppedPdfFile);
        handlePdfLinkGenerate(droppedPdfFile);
      }
      rejectedFiles.forEach(element => {
        console.log("rejected file is :", element);
      });
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      accept: "application/pdf",
      onDrop,
    });
    const handlePdfRemove=()=>{
        setPdfFile(null)
    }
    const assignmentSubmitThumbnail = 'https://i.ibb.co/P6C983Q/submitted-Assignment-Thumbnail.png'
    return (
      <div>
        <Toaster position="top-right" reverseOrder={false} />
        {pdfFile? null:(
            <div>
            <div {...getRootProps()} className="border p-8 rounded-md bg-base-100">
              <input {...getInputProps()}  />
              {isDragActive ? (
                <p>Drop the PDF here...</p>
              ) : (
                <p>Drag and drop PDF or Click to select PDF</p>
              )}
            </div>
            
        </div>
        )
        }
        <div>
        {
        pdfFile ? <div>
            <iframe
              title="PDF Preview"
              src={assignmentSubmitThumbnail}
              width=""
              height="72.5px"
              sandbox="allow-same-origin allow-scripts" //this attributes helps to prevent auto download
            ></iframe>
            
            <div className="flex gap-2 mt-4">
                <button className="btn btn-outline" onClick={handleSubmit}>Submit</button>
                <button className="btn btn-outline" onClick={handlePdfRemove}>Remove</button>
            </div>

            </div> : null }

        </div>
      </div>
    );
  };

export default AssignmentSubmitField;
