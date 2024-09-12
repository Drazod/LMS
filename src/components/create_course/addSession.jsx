// import React from "react";
import { Textarea, IconButton, Input, Collapse} from "@material-tailwind/react";
import { styled, Button, SvgIcon} from '@mui/joy';

import { useState } from "react"



export const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export function InputFileUpload(handle) {
    return (
      <Button
        component="label"
        role={undefined}
        tabIndex={-1}
        variant="outlined"
        color="neutral"
        startDecorator={
          <SvgIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
          </SvgIcon>
        }
      >
        {/* {handle ? <div>Upload a file</div>:<div>{handle}</div>} */}
        {/* <VisuallyHiddenInput type="file"/> */}
        <input type="file" onChange={handle} accept="image/*"/>
      </Button>
      
    );
  }

export function AddSession ({name, setFunc, index}) {
  
  const [text, setText] = useState(name);
  const[edit, setEdit] = useState(false)
  const[count, setCount] = useState(1)
  const[down, setDown] = useState(true)
  const[note, setNote] = useState(false)

  function handleChange(e) {
    setText(e.target.value);
  }

  function counting(){
    setCount(count+1)
  }

  function minusCounting(){
    setCount(count-1)
  }

  function handleEdit(e){
    setEdit(!edit)
    if(name ===""){
      setEdit(false)
    }
    e.preventDefault();
    setText(text);
    setFunc(prevFunc => {
      const updatedFunc = [...prevFunc];
      updatedFunc.map(i =>{
        if(i.id === index){
          i.name=text
        }
      });
      return updatedFunc;
    });
    
  }
  const handleDelete = (e) => {
    e.preventDefault();
    
    setFunc((prevFunc)=>{
      const updated = prevFunc.filter((item) => item.id !== index)
      return updated
    });
    
  };

  const handleDown =()=>{
    setDown((prev) => !prev)
    // alert(down)
  }

  const handleNote = () => {
    setNote((prev) => !prev)
  }

  function UploadFile(){
    return(
    <div className="ml-6 text-base mt-5">
      <div className="flex items-center">
        <InputFileUpload/>
        <IconButton variant="text" className="rounded-full ml-3" size="sm"  onClick={handleNote}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
          </svg>

        </IconButton>
        <IconButton variant="text" className="rounded-full" size="sm" onClick={minusCounting} >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
      </IconButton>
      </div>
      <Collapse open={note} >
        <div className="mt-3  w-[30%]">
            <Input variant="outlined" label="Note something" className="text-sm"/>
        </div>
      </Collapse>
    </div>
    )
  }

    return(
    <div> 
          <div className="ml-6">
            <div className="flex items-center mt-5">
                <div className="text-base mr-5 font-semibold">
                  
                  {!(name ==="")? 
                    <div>
                      {edit ? 
                      <div className="-mt-7 -mb-12">
                      <form onSubmit={handleEdit} id="form">
                        <Input type="text" value={text} onChange={handleChange} variant="static" className="font-semibold"/>
                      </form>
                      </div> : <>
                      {text}</>}
                    </div>
                    : 
                  <div >
                    {!edit ? 
                    <div className="-mt-7 -mb-12">
                    <form onSubmit={handleEdit} id="form" >
                      <Input type="text" value={text} onChange={handleChange} variant="static" className="font-semibold"/>
                    </form>
                    </div> : <>
                    {text}</>}
                  </div>}
                </div>
                
                <IconButton variant="text" className="rounded-full mr-2" size="sm" onClick={handleEdit}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                </IconButton>
                
                <IconButton variant="text" className="rounded-full" size="sm" onClick={handleDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>

                </IconButton>
                
                <IconButton variant="text" className="rounded-full" size="sm" onClick={handleDown}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </IconButton>
            </div>
            <Collapse open={down}>
              <div className="ml-6 mt-5">
                  <div className="text-base mr-5 font-semibold">Description</div>
              </div>
              <div className="w-[50%] mt-3 ml-6">
                  <Textarea label="Description"/>
              </div>
              <div className="ml-6 mt-1 flex items-center">
                  <div className="text-base mr-0 font-semibold">Upload</div>
                  <IconButton variant="text" className="rounded-full" size="sm" onClick={()=>counting()}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-3">
                      <   path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                  </IconButton>
              </div>
              {Array.from(Array(count),(e,index) => {
                return <UploadFile key={index}/>
              })}
            </Collapse>
          </div>
        </div>
    );
}