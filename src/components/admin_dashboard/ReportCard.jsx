const ReportCard = ({
  className, 
  title, 
  description, 
  number, 
  percent, 
  number_prefix, 
  number_postfix
}) => {
  // const percent = 50;
  return(
    <div className={"p-3 flex flex-col gap-4 rounded-md " + className}>
      <div className="flex flex-row items-center gap-4 justify-between">
        <div className="flex flex-col">
          <div className="text-lg">{title}</div>
          <div className="text-xs text-opacity-20">
            {description}
          </div>
        </div>
        <div className="text-xl">
          {number_prefix??""}
          {number}
          {number_postfix??""}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="relative w-full h-2 [&>*]:rounded-full">
          <div className={"absolute h-full bg-white " /*+ "w-[" + percent + "%]"*/} style={{width:percent+'%'}}></div>
          <div className="absolute h-full w-full bg-white bg-opacity-50"></div>
        </div>
        <div className="flex flex-row justify-between text-xs">
          <div>Change</div>
          <div>{percent}%</div>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;