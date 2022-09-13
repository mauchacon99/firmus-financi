import React from "react";

const SpinnerLoader = ({ loading }) => {
  return (
    <>
      {loading && (
        <div className="overlay">
          <div className="loadingio-spinner-spin-57qykihcnug">
            <div className="ldio-iw5dlo2hedj">
              <div>
                <div></div>
              </div>
              <div>
                <div></div>
              </div>
              <div>
                <div></div>
              </div>
              <div>
                <div></div>
              </div>
              <div>
                <div></div>
              </div>
              <div>
                <div></div>
              </div>
              <div>
                <div></div>
              </div>
              <div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default SpinnerLoader;
