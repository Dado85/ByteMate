/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { getRequest } from "../utils/requestSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Requests = () => {

  const { requests } = useSelector((state) => state.request);
  const [loadingId, setLoadingId] = useState(null);
  const dispatch = useDispatch();
  const reviewRequest = async ({ action, reqId }) => {
    try {
      setLoadingId(reqId);
      await axios.post(
        BASE_URL + "request/review/" + action + "/" + reqId,
        {},
        { withCredentials: true }
      );
      dispatch(getRequest(requests.filter((req) => req?._id != reqId)));
      toast.success(
        action === "accepted" ? "Request accepted" : "Request rejected",
        { autoClose: 1200 }
      );
    } catch (error) {
      toast.error("An error occured", { autoClose: 1200 });
    } finally {
      setLoadingId(null);
    }
  };
  const getAllRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/request/received", {
        withCredentials: true,
      });

      dispatch(getRequest(res.data.data));
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getAllRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Pending Connection Requests
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {requests?.length} Request{requests?.length !== 1 ? "s" : ""}
        </p>
      </header>

      {requests?.length === 0 ? (
        <div className="text-center max-w-md mx-auto p-4">
          <div
            className="w-24 h-24 bg-gradient-to-r from-violet-500 to-indigo-600 
                  rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <span className="text-4xl">💜</span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-4">
            No Pull Requests Yet
          </h2>

          <p className="text-gray-400 mb-6">
            Looks like your inbox is clean. Explore profiles and connect with
            developers.
          </p>

          <Link
            to="/feed"
            className="inline-block bg-gradient-to-r from-violet-500 to-indigo-600 
               text-white font-semibold py-3 px-6 rounded-full
               hover:from-violet-600 hover:to-indigo-700
               transition-all duration-200"
          >
            Browse DevMates
          </Link>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="grid gap-4">
            {requests?.map((user, key) => {
              const isLoading = loadingId === user?._id;
              return (
                <div
                  key={key}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg 
                   hover:shadow-xl transition-all duration-200 hover:scale-105"
                >
                  <div className="flex items-center space-x-4">
                    {/* Avatar */}
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={user?.fromUserId?.photoUrl}
                        alt={user?.fromUserId?.firstName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {user?.fromUserId?.firstName}, {user?.fromUserId?.age}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        @{user?.fromUserId?.firstName}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {user?.fromUserId?.about}
                      </p>
                    </div>

                    {/* Accept and Reject Button*/}
                    <div className="flex gap-4">
                      <button
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white 
                         hover:bg-blue-700 transition"
                        disabled={isLoading}
                        onClick={() =>
                          reviewRequest({
                            action: "accepted",
                            reqId: user?._id,
                          })
                        }
                      >
                        {isLoading ? "Pending ..." : "Accepted"}
                      </button>
                      <button
                        // to={`/chat/${match._id}`}
                        className="px-4 py-2 rounded-lg bg-red-600 text-white 
                         hover:bg-red-700 transition"
                        onClick={() =>
                          reviewRequest({
                            action: "rejected",
                            reqId: user?._id,
                          })
                        }
                      >
                        {isLoading ? "Pending ..." : "Rejected"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Requests;
