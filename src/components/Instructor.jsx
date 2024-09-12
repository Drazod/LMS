const Instructor = ({course}) => {
    return (
    <div className="" id="instructor">
        <h4 className="mt-10 mb-5 text-xl md:text-2xl font-semibold ">Instructor</h4>
        <div className="flex items-start border-black/10 border-[1px] px-5 py-5 mb-8  ">
            <div className="w-[85px] h-[85px] overflow-hidden rounded-[55px] mr-[15px] min-w-[85px]">
                <img src="/src/assets/CourseDetail/pic1.jpg" alt=""/>
            </div>
            <div className="text-sm leading-6">
                <h6 className="font-extrabold">{course.instructor.lastName} {course.instructor.firstName} </h6>
                <span>Professor</span>
                <ul className="my-1 flex flex-wrap items-center justify-left">
                <li>
                    <a
                        href="https://www.facebook.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block relative overflow-hidden hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        style={{ width: '35px', height: '35px' }}
                    >
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                            alt="Facebook Logo"
                            className="absolute inset-0 w-full h-full object-contain"
                        />
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.x.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block relative overflow-hidden hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        style={{ width: '30px', height: '30px' }}
                    >
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/X_logo_2023.svg/1280px-X_logo_2023.svg.png"
                            alt="Facebook Logo"
                            className="absolute inset-0 w-full h-full object-contain"
                        />
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.linkedin.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block relative overflow-hidden hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        style={{ width: '40px', height: '40px' }}
                    >
                        <img
                            src="https://logospng.org/download/linkedin/logo-linkedin-icon-4096.png"
                            alt="LinkedIn Logo"
                            className="absolute inset-0 w-full h-full object-contain"
                        />
                    </a>
                </li>
                </ul>
                <p className="">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>
            </div>
        </div>
    </div>
    );
  };
  
  export default Instructor;