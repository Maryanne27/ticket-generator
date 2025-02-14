const Steps = ({ title, step, progress }) => {
return (
  <div>
    <div className="flex md:flex-row flex-col justify-between sm:items-center mb-3">
      <h2 className="text-3xl md:text-5xl font-light font-jeju text-white">
        {title}
      </h2>
      <p className="text-base text-[#FAFAFA]">Step {step}/3</p>
    </div>

    <div className="relative h-[3px] w-full bg-[#0E464F] mb-3">
      <div
        className="absolute left-0 top-0 h-full"
        style={{ width: progress, backgroundColor: "#24A0B5" }}
      ></div>
    </div>
  </div>
);
};

export default Steps;
