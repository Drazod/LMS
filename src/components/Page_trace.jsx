const Page_trace = () => {
    return (
      <div className="border-t-[1px] border-b-[1px]">
        <div className="flex gap-1 items-center p-4 text-sm max-w-[500px] md:max-w-[1180px] mx-auto">
          <a href="/">Home</a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
          <a href="#" className="text-blue-600">Our Course</a>
        </div>
      </div>
      
    );
  };

  export default Page_trace;
