/* This example requires Tailwind CSS v2.0+ */
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section className="px-2 py-20 bg-white md:px-2 h-[90vh]">
        <div className="container items-center max-w-6xl px-18 mx-auto xl:px-5">
          <div className="flex flex-wrap items-center sm:-mx-3">
            <div className="w-full md:w-1/2 md:px-3">
              <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl">
                  <span className="block  font-normal xl:inline text-7xl">
                    Your Partner in Seamless <span className="     bg-yellow-300">Dividend</span> <span className="  bg-yellow-100">distribution </span>
                  </span>
                  <br /> <br />
                  <span className="w-full text-5xl uppercase tracking-widest font-thin text-transparent bg-clip-text bg-gradient-to-r lg:inline ">
                    1inch
                  </span>
                </h1>
                <p className="mx-auto font-thin text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">
                  The app is a plugin that allows you to distribute dividends to your token holders. It is a simple and easy to use app that allows you to distribute dividends to your token holders.
                </p>
                <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                  <Link
                    to="/app"
                    className="flex items-center w-full px-6 py-3 mb-3 text-lg hover:text-white text-black rounded-md sm:mb-0 bg-yellow-300 hover:bg-black  sm:w-auto">
                    Launch App
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 ml-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
