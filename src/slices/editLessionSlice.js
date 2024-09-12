import { API_URL } from "@/configs/ApiConfig";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEditedLessionData = createAsyncThunk(
  "editLession/fetchEditedLessionData",
  async (lessionId) => {
    const respone = await axios.get(
      API_URL + "courses/section/" + lessionId + "/contents"
    );
    const { contents, ...others } = respone.data.payload;
    const editedContents = contents?.map((block) => {
      const { type, ...otherProbs } = block;
      return {
        type: type == "DOCUMENT" ? "HTML" : "VIDEO",
        status: "unchange",
        ...otherProbs,
      };
    });
    return { contents: editedContents, ...others };
  }
);

export const handleDeleteBlocks = createAsyncThunk(
  "editLession/handleDeleteBlocks",
  async (deletedBlocks) => {
    // console.log(deletedBlocks);
    let errors = [];
    await deletedBlocks.forEach(async (block) => {
      await axios
        .delete(API_URL + "courses/deleteContent/" + block.id)
        .catch((err) => {
          console.log(err);
          // errors.push(block);
        });
    });
    return errors;
  }
);

export const handleUploadBlock = createAsyncThunk(
  "editLession/handleUploadBlock",
  async ({ index, block, lessionId, isLast }) => {
    if (block.type === "VIDEO") {
      const formData = new FormData();
      formData.append("file", uploadVideosBuffer[block.fileIndex]);
      formData.append("sectionId", lessionId);
      console.log(formData);
      const respone = await axios.post(
        API_URL + "courses/addContent/video",
        formData
      );
      // .then((res) => {
      //   URL.revokeObjectURL(block.content);
      //   uploadVideosBuffer[block.fileIndex] = null;
      //   return res;
      // });
      return {
        index,
        data: { ...respone.data.payload, status: "unchange" },
        isLast: isLast ?? false,
      };
    } else {
      const respone = await axios.post(
        API_URL + "courses/addContent/document",
        {
          sectionId: lessionId,
          content: block.content,
        }
      );
      return {
        index,
        data: { ...respone.data.payload, status: "unchange" },
        isLast: isLast ?? false,
      };
    }
  }
);

export const handleUpdateBlock = createAsyncThunk(
  "editLession/handleUpdateBlock",
  async ({ index, block }) => {
    if (block.type === "VIDEO") {
      // console.log(uploadVideosBuffer[block.fileIndex]);
      const formData = new FormData();
      formData.append("file", uploadVideosBuffer[block.fileIndex]);
      formData.append("contentId", block.id);
      const respone = await axios.post(
        API_URL + "courses/updateContent/video",
        formData
      );
      // .then((res) => {
      //   URL.revokeObjectURL(block.content);
      //   uploadVideosBuffer[block.fileIndex] = null;
      //   return res;
      // });
      return {
        index,
        data: { ...respone.data.payload, status: "unchange" },
      };
    } else {
      const respone = await axios.post(
        API_URL + "courses/updateContent/document",
        {
          contentId: block.id,
          content: block.content,
        }
      );
      return {
        index,
        data: { ...respone.data.payload, status: "unchange" },
      };
    }
  }
);

export const handleUpdatePositions = createAsyncThunk(
  "editLession/handleUpdatePositions",
  async ({ blocks, lessionId }) => {
    const updates = blocks.map((block, index) => ({
      contentId: block.id,
      newPosition: index,
    }));
    // console.log(updates);
    const respone = await axios.put(
      API_URL + "courses/sections/" + lessionId + "/contents/positions",
      {
        updates: updates,
      }
    );
    return respone.data.payload;
  }
);

let uploadVideosBuffer = [];

const initialState = {
  lessionName: "Lession name",
  lessionId: null,
  // courseId: 0,
  blocks: [
    // {
    //   type: "HTML|VIDEO|EDITOR",
    //   content:
    //     '<div class="text-2xl">Est adipisicing pariatur deserunt ex.</div>',
    //   status: "new|change|unchange",
    // },
  ],
  deletedBlocks: [],
  saved: true,
  loading: false,
  uploading: false,
};

const editLessionSlice = createSlice({
  name: "editLession",
  initialState,
  reducers: {
    changeName: {
      reducer: (state, action) => {
        state.saved = false;
        state.lessionName = action.payload.name;
      },
      prepare: (name) => {
        return { payload: { name } };
      },
    },
    addBlock: {
      reducer: (state, action) => {
        state.saved = false;

        let newData = {
          type: action.payload.type,
          content: action.payload.content,
          status: "new",
        };

        if (newData.type === "VIDEO") {
          newData = { ...newData, fileIndex: uploadVideosBuffer.length };
        }

        state.blocks.splice(action.payload.index, 0, newData);
      },
      prepare: (index, type, content) => {
        return { payload: { index, type, content } };
      },
    },
    moveBlock: {
      reducer: (state, action) => {
        state.saved = false;
        const movedContent = state.blocks.splice(action.payload.from, 1)[0];
        state.blocks.splice(action.payload.to, 0, movedContent);
      },
      prepare: (from, to) => {
        return { payload: { from, to } };
      },
    },
    editBlock: {
      reducer: (state, action) => {
        state.saved = false;
        state.blocks[action.payload.index].content = action.payload.content;
        if (state.blocks[action.payload.index].status === "unchange") {
          state.blocks[action.payload.index].status = "change";
        }
      },
      prepare: (index, content) => {
        return { payload: { index, content } };
      },
    },
    editBlockVideo: {
      reducer: (state, action) => {
        state.saved = false;
        state.blocks[action.payload.index].content = action.payload.content;
        if (state.blocks[action.payload.index].status === "unchange") {
          state.blocks[action.payload.index].status = "change";
        }
      },
      prepare: (index, content, fileIndex) => {
        uploadVideosBuffer[fileIndex] = content; // This is stupid, fix later... maybe?
        return {
          payload: {
            index,
            content: URL.createObjectURL(content),
          },
        };
      },
    },
    deleteBlock: {
      reducer: (state, action) => {
        state.saved = false;
        const data = state.blocks[action.payload.index];
        if (data.type === "VIDEO") {
          URL.revokeObjectURL(data.content);
          uploadVideosBuffer[data.fileIndex] = null;
        }
        const status = state.blocks[action.payload.index].status;
        if (status === "unchange" || status === "change") {
          // state.blocks[action.payload.index].status = "change";
          state.deletedBlocks = state.deletedBlocks.concat(
            state.blocks.splice(action.payload.index, 1)
          );
        } else {
          state.blocks.splice(action.payload.index, 1);
        }
      },
      prepare: (index) => {
        return { payload: { index } };
      },
    },
    cleanContent: {
      reducer: (state, action) => {
        const newBlocks = [...state.blocks];
        state.blocks = newBlocks.filter((block) => {
          if ((block.content === "") | (block.content === null)) {
            state.deletedBlocks.push(block);
            return false;
          }
          return true;
        });
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEditedLessionData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEditedLessionData.fulfilled, (state, action) => {
        state.loading = false;
        state.lessionId = action.payload.sectionId;
        state.lessionName = action.payload.sectionName;
        state.blocks = action.payload.contents;
        // console.log(current(state));
      })
      .addCase(fetchEditedLessionData.rejected, (state, action) => {
        state.loading = false;
      });
    builder.addCase(handleDeleteBlocks.fulfilled, (state, action) => {
      // console.log(action);
      state.deletedBlocks = action.payload;
    });
    builder
      .addCase(handleUploadBlock.pending, (state, action) => {
        state.uploading = true;
        console.log(action);
      })
      .addCase(handleUploadBlock.fulfilled, (state, action) => {
        const { type } = state.blocks[action.payload.index];
        state.blocks[action.payload.index] = { ...action.payload.data, type };
        // console.log(state.blocks[action.payload.index]);
        // console.log("upload");
        // console.log(action.payload.isLast);
        console.log(action);
        if (action.payload.isLast) {
          state.uploading = false;
          // console.log(current(state.blocks));

          const updates = state.blocks.map((block, index) => ({
            contentId: block.id,
            newPosition: index,
          }));
          axios.put(
            API_URL +
              "courses/sections/" +
              state.lessionId +
              "/contents/positions",
            {
              updates: updates,
            }
          );

          // console.log("done");
        }
        // console.log(action.payload.data);
      })
      .addCase(handleUploadBlock.rejected, (state, action) => {
        // state.loading = false;
        console.log(action);
      });
    // builder
    //   .addCase(handleUpdateBlock.pending, (state, action) => {
    //     console.log(action);
    //   })
    //   .addCase(handleUpdateBlock.fulfilled, (state, action) => {
    //     console.log(action);
    //   })
    //   .addCase(handleUpdateBlock.rejected, (state, action) => {
    //     console.log(action);
    //   });
  },
});

export const {
  changeName,
  addBlock,
  moveBlock,
  editBlock,
  editBlockVideo,
  deleteBlock,
  cleanContent,
} = editLessionSlice.actions;
export default editLessionSlice.reducer;
