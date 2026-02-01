import React, { useState } from "react";
import Container from "../Components/Container";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { toast } from "react-toastify";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [previewPic, setPreviewPic] = useState(user?.photoUrl);
  const [picfile, setPicFile] = useState(null);
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    age:user?.gender || "",
    gender: user?.gender || "",
    about: user?.about || "",
    skills: user?.skills || "",
    profession:user?.profession || "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleBack = () => {
    navigate("/profile");
  };
  const handlePreviewImg = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setPicFile(file);
    setPreviewPic(previewUrl);
  };
  const handleSubmit = async () => {
    const fd = new FormData();
    fd.append("firstName", formData.firstName);
    fd.append("lastName", formData.lastName);
    fd.append("age", formData.age);
    fd.append("gender", formData.gender);
    fd.append("about", formData.about); // string only
    fd.append("skills", formData.skills); // string only
    fd.append("profession", formData.profession);
    if (picfile) {
      fd.append("file", picfile);
    }

    try {
      setError("");
      const res = await axios.post(BASE_URL + "profile/edit", fd, {
        withCredentials: true,
      });
        toast.success("Profile Updated Successfully.", {
                autoClose: 1000,
              });
      dispatch(addUser(res.data.data));
      navigate("/feed");
    } catch (err) {
      console.error("AXIOS ERROR:", err.response);
      if (err.response?.data) {
        const fieldErrors = {};
        err.response?.data.forEach((e) => (fieldErrors[e.field] = e.message));
        setError(fieldErrors);
      }
    }
  };
  return (
    <Container>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Edit Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Update your personal information
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-8">
          {/* Profile Photo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Profile Photo URL
            </label>
            <div className="flex items-center gap-4">
              <img
                src={previewPic}
                alt="profile"
                className="w-20 h-20 rounded-full object-cover ring-2 ring-indigo-500/40"
              />
              <div>
                <label
                  htmlFor="photo"
                  className="
          inline-block px-4 py-2
          rounded-lg cursor-pointer
          bg-indigo-600 hover:bg-indigo-500
          text-white text-sm font-medium
        "
                >
                  Choose Photo
                </label>

                <input
                  id="photo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePreviewImg}
                />

                <p className="text-xs text-gray-500 mt-1">
                  JPG, PNG, WEBP (max 2MB)
                </p>
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Age</label>
              <input
                type="number"
                name="age"
                min={18}
                value={formData.age}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
              />
              {error.age && (
                <p className="text-sm text-red-500 mt-1">{error.age}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {error.gender && (
                <p className="text-sm text-red-500 mt-1">{error.gender}</p>
              )}
            </div>
          </div>

          {/* About */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Short Bio❤️‍🔥
            </label>
            <textarea
              rows={2}
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900 resize-none"
            />
            {error.about && (
              <p className="text-sm text-red-500 mt-1">{error.about}</p>
            )}
          </div>
          {/*profession*/}
          <div>
            <label className="block text-sm font-medium mb-1">Profession</label>
            <input
              type="text"
              value={formData.profession}
              onChange={handleChange}
              name="profession"
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
            />
            {error.profession && (
              <p className="text-sm text-red-500 mt-1">{error.profession}</p>
            )}
          </div>
          {/* Skills */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Skills (comma separated)
            </label>
            <input
              type="text"
              value={formData.skills}
              onChange={handleChange}
              name="skills"
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
            />
            {error.skills && (
              <p className="text-sm text-red-500 mt-1">{error.skills}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              className="px-6 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
              onClick={handleBack}
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default EditProfile;
