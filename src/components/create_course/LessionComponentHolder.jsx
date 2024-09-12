import { Draggable, Droppable } from "@hello-pangea/dnd";
import lessionComponents from "@/constants/lessionComponents";
import { Button, CircularProgress, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { FeaturedVideo, TextFormat, UploadFile } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

const TabContent = ({ children, value, index, ...others }) => {
  return value === index && <div {...others}>{children}</div>;
};

const LessionComponentHolder = () => {
  const dispatch = useDispatch();
  const [value, changeValue] = useState(0);
  const { baseValue, uploading } = useSelector((state) => state.editLession);

  const handleChangeTab = (event, value) => {
    changeValue(value);
  };

  const handleUpload = (event) => {
    console.log(event);
    // const formData = new FormData();
    // formData.append("file", event.target.files[0]);
    dispatch(
      uploadVideo({
        sectionId: baseValue.sectionId,
        file: event.target.files[0],
      })
    );
  };

  return (
    <div className="w-full h-full flex flex-col bg-white border rounded-lg shadow-md">
      <Droppable droppableId="lession_components" isDropDisabled={true}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-row h-full"
          >
            <Tabs
              value={value}
              onChange={handleChangeTab}
              orientation="vertical"
              sx={{ minWidth: 0 }}
              className="border-r py-4"
            >
              <Tab
                icon={<TextFormat />}
                sx={{ paddingX: "4", paddingY: "4", minWidth: 0, minHeight: 0 }}
              />
              <Tab
                icon={<FeaturedVideo />}
                sx={{ paddingX: "4", paddingY: "4", minWidth: 0, minHeight: 0 }}
              />
            </Tabs>
            <TabContent
              value={value}
              index={0}
              className="flex flex-col flex-grow overflow-y-auto pl-2 py-4"
            >
              {Object.entries(lessionComponents).map((component, index) => (
                <Draggable draggableId={component[0]} index={index} key={index}>
                  {(provided, snapshot) => (
                    <>
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="hover:border-y p-1"
                      >
                        {component[1].display}
                      </div>
                      {snapshot.isDragging && (
                        <div className="[&~div]:transition-none! p-1 border-y border-dashed ">
                          {component[1].display}
                        </div>
                      )}
                    </>
                  )}
                </Draggable>
              ))}
            </TabContent>
            <TabContent
              value={value}
              index={1}
              className="flex flex-col flex-grow"
            >
              <div className="flex flex-col flex-grow pl-2 py-4 overflow-y-auto">
                Videos
              </div>
              <div className="border-t h-10 flex items-center justify-center">
                {!uploading ? (
                  <Button className="w-full h-full" component="label">
                    <UploadFile />
                    <p>Upload video</p>
                    <input
                      type="file"
                      className="hidden"
                      onInput={handleUpload}
                    />
                  </Button>
                ) : (
                  <CircularProgress size={20} />
                )}
              </div>
            </TabContent>
            {/* {provided.placeholder} */}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default LessionComponentHolder;
