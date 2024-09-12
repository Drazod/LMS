import '../configs/color.css';

const PageEntry = ({ course }) => {
    return ( 
    <div className="h-[200px] md:h-[370px] bg-cover bg-center table w-full text-left ovbl-dark  overflow-hidden z-7"
    style={{
        backgroundImage: `url(${course.courseThumbnail})`,
    }} >
        <div className="table h-full w-full">
            <div className=" table-cell align-middle text-center">
                <h1 className="text-white text-xl md:text-5xl font-black relative z-[9]">Courses Details</h1>
            </div>
        </div>
    </div>
    );
  };
  
  export default PageEntry;