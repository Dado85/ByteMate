/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { getConnection } from "../utils/connectionSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Connection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedMatch, setSelectedMatch] = useState(null);
  const { matches } = useSelector((state) => state.matches);
  const { msgUserID } = useSelector((state) => state.msgUserID);
 

  const dispatch = useDispatch();
  const openModal = (match) => {
    setSelectedMatch(match);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMatch(null);
    setModalOpen(false);
  };
  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/connection", {
        withCredentials: true,
      });
   
      dispatch(getConnection(res?.data?.data));
    } catch (error) {
      console.error(error.message);
    }
  };
  const removeConnection = async ({ reqId }) => {
    try {
      await axios.delete(BASE_URL + "user/remove/" + reqId, {
        withCredentials: true,
      });
      dispatch(getConnection(matches.filter((match) => match?._id != reqId)));
      toast.success("SuccessFully removed connection", { autoClose: 1200 });
    } catch (error) {
      console.error(error.message);
      toast.error("an error occured", { autoClose: 1100 });
    } finally {
      closeModal();
    }
  };
  useEffect(() => {
    fetchConnection();
  }, [msgUserID]);
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Your Matches
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {matches?.length} match{matches?.length !== 1 ? "es" : ""}
        </p>
      </header>

      {matches?.length === 0 ? (
        <div className="text-center max-w-md mx-auto p-5">
          <div
            className="w-24 h-24 bg-gradient-to-r from-violet-500 to-indigo-600 
                  rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <span className="text-4xl">💜</span>
          </div>

          {/* <h2 className="text-2xl font-bold text-white mb-4">No matches yet</h2> */}

          <p className="text-gray-400 mb-6">
            No connections yet — your next Dev partner is just a swipe away.
          </p>

          <Link
            to="/feed"
            className="inline-block bg-gradient-to-r from-violet-500 to-indigo-600 
               text-white font-semibold py-3 px-6 rounded-full
               hover:from-violet-600 hover:to-indigo-700
               transition-all duration-200"
          >
            Start Swiping
          </Link>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="grid gap-4">
            {matches?.map((match, key) => (
              <div
                key={key}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg 
                   hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                <div className="flex items-center space-x-4">
                  {/* Avatar */}
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={match?.photoUrl}
                      alt={match?.firstName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {match?.firstName}, {match?.age}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      @{match?.firstName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {match?.about}
                    </p>
                  </div>

                  {/* Message Button (ONLY clickable) */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => navigate(`/chat/${match._id}`)}
                      className="px-4 py-2 rounded-lg bg-blue-600 text-white 
                         hover:bg-blue-700 transition"
                    >
                      Message
                    </button>
                    <button
                      onClick={() => openModal(match)}
                      className="px-4 py-2 rounded-lg bg-red-600 text-white 
                         hover:bg-red-700 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-96 text-center">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Remove Connection
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Do you want to remove{" "}
              <span className="font-semibold text-xl">
                {selectedMatch?.firstName}
              </span>{" "}
              from your connections?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => removeConnection({ reqId: selectedMatch?._id })}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Remove
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Connection;
