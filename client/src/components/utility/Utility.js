import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_BACKENED_URL;
// import { toast } from "react-toastify";

export const fetchComments = async (blogId) => {
  try {
    const res = await axios.get(
      `${baseUrl}/api/comments/get-all-comments/${blogId}`
    );

    if (!res.data.data.comments) {
      throw new Error("Invalid response structure");
    }
    const comments = res?.data?.data;
    console.log("res data", comments);
    return comments;
  } catch (error) {
    console.log("frontEnd comment fetching error", error);
  }
};
