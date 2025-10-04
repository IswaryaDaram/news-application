import React from "react";

function Loader() {
  return (
    <div className="w-full flex justify-center py-20">
      <span className="loader w-12 h-12 border-4 border-redHighlight border-t-transparent rounded-full animate-spin"></span>
    </div>
  );
}

export default Loader;
