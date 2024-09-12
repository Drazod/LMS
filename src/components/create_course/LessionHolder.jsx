import {
  changeName,
  deleteBlock,
  editBlock,
  editBlockVideo,
  fetchEditedLessionData,
} from "@/slices/editLessionSlice";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import ContentEditable from "react-contenteditable";
import { useDispatch, useSelector } from "react-redux";
import { DragIndicator, Delete, UploadFile } from "@mui/icons-material";
import ReactQuill from "react-quill";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { prepareAutoBatched } from "@reduxjs/toolkit";
import { Button } from "@mui/material";

const LessionHolder = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { lessionName, blocks } = useSelector((state) => state.editLession);

  useEffect(() => {
    dispatch(fetchEditedLessionData(params.lessionId));
  }, []);

  const handleEditName = (event) => {
    dispatch(changeName(event.target.value));
  };

  const handleEdit = (index, content) => {
    dispatch(editBlock(index, content));
  };

  const handleDelete = (index) => {
    dispatch(deleteBlock(index));
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const text = event.clipboardData.getData("text/plain");
    document.execCommand("insertHTML", false, text);
  };

  const handleUpload = (index, event, fileIndex) => {
    dispatch(editBlockVideo(index, event.target.files[0], fileIndex));
  };

  return (
    <div className="w-full flex-row mt-4 text-pretty break-words">
      <input
        type="text"
        className="text-3xl text-bold w-full h-9"
        onInput={handleEditName}
        value={lessionName}
      />
      <Droppable droppableId="lession">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="w-full h-full flex flex-col min-h-24"
          >
            {blocks.map((block, index) => (
              <Draggable
                draggableId={"block" + index.toString()}
                disableInteractiveElementBlocking={false}
                index={index}
                key={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="relative hover:min-h-11 hover:border-y [&>:nth-child(2)]:hover:visible"
                  >
                    {(() => {
                      // console.log(block.content);
                      switch (block.type) {
                        case "HTML":
                          return (
                            <ContentEditable
                              html={block.content}
                              className="flex-grow p-1 hover:min-h-10"
                              onChange={(event) => {
                                handleEdit(index, event.target.value);
                              }}
                              onPaste={handlePaste}
                            />
                          );
                        case "EDITOR":
                          return (
                            <ReactQuill
                              theme="snow"
                              style={{ minHeight: "100px" }}
                              placeholder="Write something"
                              value={block.content}
                              onChange={(content) => {
                                handleEdit(index, content);
                              }}
                              // ref={quillRef}
                            />
                          );
                        case "VIDEO":
                          return block.content === "" ? (
                            <Button className="w-full h-full" component="label">
                              <UploadFile />
                              <p>Upload video</p>
                              <input
                                type="file"
                                className="hidden"
                                onInput={(event) =>
                                  handleUpload(index, event, block.fileIndex)
                                }
                                accept="video/*"
                              />
                            </Button>
                          ) : (
                            <video controls>
                              <source src={block.content} />
                            </video>
                          );
                        default:
                          break;
                      }
                    })()}
                    <div className="absolute top-1 right-1 flex flex-row gap-1 invisible">
                      <button
                        className="flex w-8 h-8 border rounded-lg hover:bg-red-500"
                        onClick={() => handleDelete(index)}
                      >
                        <Delete className="m-auto" />
                      </button>
                      <div
                        {...provided.dragHandleProps}
                        className="flex w-8 h-8 border rounded-lg bg-white"
                      >
                        <DragIndicator className="m-auto" />
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default LessionHolder;
