import { IconButton } from "@material-tailwind/react";
import { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";

import DashboardBreadcrumb from "@/components/admin_dashboard/DashboardBreadcrumb";
import LessionHolder from "@/components/create_course/LessionHolder";
import LessionComponentHolder from "@/components/create_course/LessionComponentHolder";
import { useDispatch, useSelector } from "react-redux";
import {
  addBlock,
  cleanContent,
  handleDeleteBlocks,
  handleUpdateBlock,
  handleUpdatePositions,
  handleUploadBlock,
  moveBlock,
} from "@/slices/editLessionSlice";
import { renderToStaticMarkup } from "react-dom/server";
import lessionComponents from "@/constants/lessionComponents";
import { EditNoteOutlined, UTurnLeftOutlined } from "@mui/icons-material";
import { Button, Grow } from "@mui/material";

const Section = () => {
  const [open, changeOpen] = useState(true);
  const dispatch = useDispatch();

  const editLessionData = useSelector((state) => state.editLession);

  function onDragEnd(result) {
    if (result.destination == null) {
      return;
    }

    if (result.source.droppableId == "lession") {
      dispatch(moveBlock(result.source.index, result.destination.index));
    } else if (result.source.droppableId == "lession_components") {
      const content = renderToStaticMarkup(
        lessionComponents[result.draggableId].content
      );
      dispatch(
        addBlock(
          result.destination.index,
          lessionComponents[result.draggableId].type,
          content
        )
      );
    }
  }

  const handleComponentBtn = () => {
    changeOpen(!open);
  };

  const handleSave = () => {
    // dispatch(cleanContent());
    dispatch(handleDeleteBlocks(editLessionData.deletedBlocks));

    const lessionId = editLessionData.lessionId;
    let length = editLessionData.blocks.filter(
      (block) => block.status === "new"
    ).length;
    if (length <= 0) {
      dispatch(
        handleUpdatePositions({
          lessionId: editLessionData.lessionId,
          blocks: editLessionData.blocks,
        })
      );
    }
    editLessionData.blocks.forEach((block, index) => {
      if (block.status === "new") {
        length = length - 1;
        // console.log("new " + length);
        dispatch(
          handleUploadBlock({
            index,
            block,
            lessionId,
            isLast: length == 0,
          })
        );
      } else if (block.status === "change") {
        // console.log(block);
        dispatch(handleUpdateBlock({ index, block }));
      }
    });
  };

  return (
    <div className="flex flex-col w-full ">
      <DashboardBreadcrumb homePath="/create" name="Edit Course" />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="w-full shadow-md flex flex-row gap-4 my-10 p-6">
          <div className="flex-grow border">
            <LessionHolder />
          </div>
        </div>
        <Button onClick={handleSave}>Save</Button>
        <div className="flex flex-row gap-1 absolute bottom-2 right-4">
          <Grow
            in={open}
            style={{ transformOrigin: "100% 100%" }}
            hidden={!open}
          >
            <div className="w-72 h-96">
              <LessionComponentHolder />
            </div>
          </Grow>
          <IconButton onClick={handleComponentBtn} className="mt-auto">
            <EditNoteOutlined></EditNoteOutlined>
          </IconButton>
        </div>
      </DragDropContext>
    </div>
  );
};
export default Section;
