
import { Input, Textarea, IconButton} from "@material-tailwind/react";
import { Button} from '@mui/joy';
import {InputFileUpload} from "./addSession";

const AddVideo = () =>{

    
    return(
        <div className="text-3xl flex  w-full">
            <div className=" bg-white flex items-center lg:flex-col w-[100%]">
                <div  className="flex bg-white w-full h-12 items-center justify-center">
                    <div className="w-[93%] border-b-2 border-[#D9D9D9] h-8 flex items-center  lg:flex-row mt-5">
                        <div className="text-base ml-2 font-semibold border-r-2 border-[#D9D9D9] w-32">
                            Create Course
                        </div>
                        <div className="ml-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                        </div>
                        <div className="text-base ml-2 text-[#A2A2A2]">
                            Home {'>'} Create Course
                        </div>
                    </div>
                </div>
                <div className="h-auto w-[90%] shadow-md mt-10 mb-28">
                    <div className="flex-col justify-center ml-10 my-3">
                        
                        <div className="flex items-center mt-6">
                            <p className="text-xl mr-3 font-semibold">Add Video</p>
                            <IconButton variant="text" className="rounded-full" size="sm" >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-4">
                                <   path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </IconButton>
                        </div>
                        <div className="text-base font-semibold ml-6 mt-3 w-full">
                            Video Title
                            <div className="mt-3  w-[50%]">
                                <Input variant="outlined" label="Title" className="text-sm" />
                            </div>
                        </div>
                        <div className="text-base font-semibold ml-6 mt-3">
                            Video Description
                            <div className="w-[60%] mt-3">
                                <Textarea label="Description"/>
                            </div>
                        </div>
                        <div className="ml-6 mt-1">
                            <p className="text-base mr-0 font-semibold">Upload</p>
                            <div className="ml-6 text-base mt-3 ">
                            <div className="my-3 text-base font-semibold">
                                    Upload file
                                </div>
                                <InputFileUpload/>
                                <div className="my-3 text-base font-semibold">
                                    OR:
                                </div>
                                <div className="w-[30%]">
                                    <Input size="sm" variant="outlined" label="URL" className="text-sm"/>
                                </div>
                                <div className="my-3 text-base font-semibold">
                                    Thumbnail
                                </div>
                                <InputFileUpload/>
                            </div>
                        </div>
                    </div>
                    <div className="ml-10 mb-16 mt-10">
                        <Button>Submit</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddVideo