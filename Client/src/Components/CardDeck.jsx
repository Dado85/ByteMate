import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeFeed } from "../utils/feedSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { FaHeart, FaTimes } from "react-icons/fa";
import UserCard from "./UserCard";

const CardDeck = ({ fetchMore ,loading,hasMore}) => {
  const { feed } = useSelector((state) => state.feed);
  const dispatch = useDispatch();
  const currentUser = feed[0];
  useEffect(() => {
if (feed.length <= 2 && !loading && hasMore ) {
      fetchMore();
    }  }, [feed.length, loading, hasMore, fetchMore]);
  const handleReviewConnection = async ({ status }) => {
    const prevState = [...feed];
    try {
      dispatch(removeFeed(currentUser?._id));
      const res = await axios.post(
        BASE_URL + "request/send/" + status + "/" + currentUser?._id,
        {},
        { withCredentials: true }
      );
     
    } catch (error) {
      dispatch(addFeed(prevState));
      console.error(error.message);
    }
  };
  if (!currentUser) return null;
  return (
    <div className="flex justify-center items-center gap-12 mt-10">
      {/* Reject */}
      <button
        onClick={() => handleReviewConnection({ status: "ignored" })}
        className="bg-white text-red-500 p-4 rounded-full shadow-lg hover:scale-110 transition"
      >
        <FaTimes size={24} />
      </button>

      {/* Card */}
      <UserCard user={currentUser} />

      {/* Like */}
      <button
        onClick={() => handleReviewConnection({ status: "interested" })}
        className="bg-white text-green-500 p-4 rounded-full shadow-lg hover:scale-110 transition"
      >
        <FaHeart size={24} />
      </button>
    </div>
  );
};

export default CardDeck;
