import { useState } from "react";

const Navbar = ({ children, href, FlyoutContent }) => {
  const [open, setOpen] = useState(false);
  const showFlyout = open && FlyoutContent;

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative h-fit w-fit my-2 mx-3 hidden xl:block"
    >
      <a href={href} className="relative text-white hover:text-indigo-300">
        {children}
        <span
          style={{
            transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
          }}
          className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left rounded-full bg-indigo-300 transition-transform duration-300 ease-out"
        />
      </a>
      {showFlyout && (
        <div className="absolute -left-6 top-12 bg-gray-50 text-black rounded-lg">
          <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent"></div>
          <div className="absolute left-10 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gray-50 z-0" />
          <FlyoutContent />
        </div>
      )}
    </div>
  );
};

export default Navbar;
