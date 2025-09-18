
import { useState } from "react";
import API from "@/apis/instance";
import { Textarea, IconButton, Input, Collapse, Card, Typography, Tooltip } from "@material-tailwind/react";
import { Button } from "@mui/joy";
import { CircularProgress } from "@mui/material";
import { FaRegStickyNote, FaMinusCircle, FaPlusCircle, FaFileUpload } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import { IoMdSave } from "react-icons/io";
import "react-quill/dist/quill.snow.css";

// Function to handle file upload input
function InputFileUpload({ handleFile }: { handleFile: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <Tooltip content="Upload file">
        <span className="text-blue-600 hover:text-blue-800 transition-colors">
          <FaFileUpload size={22} />
        </span>
      </Tooltip>
      <input type="file" onChange={handleFile} accept="image/*" className="hidden" />
      <span className="text-sm font-medium">Choose file</span>
    </label>
  );

}


export function AddSession({ name, setFunc, index, courseId }: {
  name: string;
  setFunc: (updater: ((prev: any[]) => any[]) | any[]) => void;
  index: number;
  courseId: number;
}) {
  const [text, setText] = useState(name);
  const [count, setCount] = useState(1);
  const [down, setDown] = useState(true);
  const [note, setNote] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value);
  const handleDescriptionChange = (value: string) => setDescription(value);
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files || e.target.files.length === 0) {
      setFile(null);
    } else {
      setFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // 1. Create the section first (without file)
      const payload = {
        courseId,
        sectionName: text,
        position: index,
      };
      const sectionRes = await API.post("/courses/addSection", payload);
      console.log("Section creation response:", sectionRes);
      const sectionId = sectionRes.data.payload?.sectionId;

      // 2. If file is present, upload it with sectionId
      let contentUrl = "";
      if (file && sectionId) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("sectionId", sectionId);
        const uploadRes = await API.post("/courses/addContent/video", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setFunc((prev: any[]) => {
        const updatedFunc = [...prev];
        updatedFunc.map((i) => {
          if (i.id === index) {
            i.name = text;
            i.description = description;
          }
        });
        return updatedFunc;
      });
      setText("");
      setDescription("");
      setFile(null);
      setDown(false);
    } catch (error) {
      console.error("Error saving session:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // const handleDown = () => setDown((prev) => !prev);
  const handleNote = () => setNote((prev) => !prev);
  const counting = () => setCount((prev) => prev + 1);
  const minusCounting = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));

  // File upload component
  const UploadFile = () => (
    <div className="flex flex-col gap-2 bg-gray-50 rounded-lg p-4 mt-4 shadow-sm border border-gray-200 w-full max-w-md">
      <div className="flex items-center gap-3">
        <InputFileUpload handleFile={handleFile} />
        <Tooltip content="Add note">
          {(
            <IconButton
              id="add-note-btn"
              name="add-note-btn"
              title="Add note"
              variant="text"
              className="rounded-full ml-1"
              size="sm"
              onClick={handleNote}
              ripple={false}
              type="button"
            >
              <FaRegStickyNote size={18} className="text-gray-600 hover:text-blue-600 transition-colors" />
            </IconButton>
          ) as any}
        </Tooltip>
        <Tooltip content="Remove upload">
          {(
            <IconButton
              id="remove-upload-btn"
              name="remove-upload-btn"
              title="Remove upload"
              variant="text"
              className="rounded-full"
              size="sm"
              onClick={minusCounting}
              disabled={count === 1}
              ripple={false}
              type="button"
            >
              <FaMinusCircle size={18} className={count === 1 ? "text-gray-300" : "text-red-500 hover:text-red-700 transition-colors"} />
            </IconButton>
          ) as any}
        </Tooltip>
      </div>
      {(
        <Collapse open={note}>
          <div className="mt-2 w-full">
            <Input
              id="note-input"
              name="note-input"
              title="Note something"
              variant="outlined"
              label="Note something"
              className="text-sm"
              type="text"
            />
          </div>
        </Collapse>
      ) as any}
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      {(
        <Card className="w-full max-w-2xl p-8 shadow-xl border border-gray-200 bg-white" id="add-session-card" title="Add Session Card">
          <Typography variant="h4" color="blue-gray" className="mb-2 flex items-center gap-2" id="add-session-title" title="Session Details">
            <MdDescription className="text-blue-500" size={28} />
            Session Details
          </Typography>
          <div className="my-6 border-t" />
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="session-title">Title</label>
            {(
              <Input
                id="session-title"
                name="session-title"
                title="Session Title"
                variant="outlined"
                value={text}
                onChange={handleChange}
                className="w-full text-base"
                placeholder="Enter session title"
                type="text"
              />
            ) as any}
          </div>
          {(
            <Collapse open={down}>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-1" htmlFor="session-description">Description</label>
                <Textarea
                  id="session-description"
                  name="session-description"
                  title="Session Description"
                  value={description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleDescriptionChange(e.target.value)}
                  className="w-full text-base"
                  placeholder="Describe this session..."
                  rows={4}
                />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base font-semibold text-gray-700">Upload</span>
                <Tooltip content="Add upload">
                  {(
                    <IconButton
                      id="add-upload-btn"
                      name="add-upload-btn"
                      title="Add upload"
                      variant="text"
                      className="rounded-full"
                      size="sm"
                      onClick={counting}
                      ripple={false}
                      type="button"
                    >
                      <FaPlusCircle size={18} className="text-green-600 hover:text-green-800 transition-colors" />
                    </IconButton>
                  ) as any}
                </Tooltip>
              </div>
              {Array.from(Array(count), (_, idx) => <UploadFile key={idx} />)}
            </Collapse>
          ) as any}
          <div className="my-6 border-t" />
          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-6 py-2 rounded shadow-md transition-all"
              // @ts-ignore
              startDecorator={<IoMdSave size={20} />}
            >
              {isSaving ? <CircularProgress size={20} className="mr-2" /> : "Save Session"}
            </Button>
          </div>
        </Card>
      ) as any}
    </div>
  );
}
