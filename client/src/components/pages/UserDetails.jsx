import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router";
import { IoAddSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import axios from "axios";
import moment from "moment";
import { RiDeleteBin5Fill, RiEdit2Fill } from "react-icons/ri";
import { SiTicktick } from "react-icons/si";
import userLogo from "@/assets/profileImg.svg";
import Spinner from "../Spinner";
import { LogOut } from "lucide-react";
const baseUrl = import.meta.env.VITE_BASE_BACKENED_URL;

const UserDetails = () => {
  const [users, setUsers] = useState({});
  const [isReloading, setIsRealoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDeleteUser = async (id) => {
    const shouldProceed = confirm("Are you sure! want to Delete user");
    if (!shouldProceed) {
      return toast("user delete cancelled");
    }
    try {
      setIsLoading(true);
      const deleteUser = await axios.delete(
        `${baseUrl}/api/user/delete/${id}`,
        {
          withCredentials: true,
        }
      );

      // console.log("success", deleteUser);
      setIsRealoading(isReloading ? false : true);
      toast.success(deleteUser.data.message);
    } catch (error) {
      console.log("user delete error", error);
      toast.error(
        error.response.data.message || error.response.data.msg || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReactivateUser = async (id) => {
    const shouldProceed = confirm("Are you sure! want to Reactivate user");
    if (!shouldProceed) {
      return toast("user Reactivation cancelled !");
    }
    try {
      setIsLoading(true);
      const reActivateUser = await axios.get(
        `${baseUrl}/api/user/reactivate/${id}`,
        { withCredentials: true }
      );

      // console.log("success", reActivateUser);
      setIsRealoading(isReloading ? false : true);
      toast.success(reActivateUser.data.message);
    } catch (error) {
      console.log("user reactivation error", error);
      if (error.status == 401) {
        LogOut();
        navigate("/login");
      }
      toast.error(
        error.response.data.message || error.response.data.msg || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserLink = (userid) => {
    // navigate(`/user/single-blogs/${blogid}`);
    navigate("/user/update-profile");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUsers = await axios.get(`${baseUrl}/api/user/all-users`, {
          withCredentials: true,
        });
        setUsers(fetchedUsers?.data?.data);
      } catch (error) {
        console.log("error fetching category", error);
        toast.error(
          error.response.message || error.response.msg || "error! loading users"
        );
      }
    };
    fetchData();
  }, [isReloading]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      {/* {console.log("fetchedUsers", users)} */}

      <div className="m-3 md:left-75 md:top-5">
        <Button asChild>
          <Link to="/register">
            <IoAddSharp /> Add new User
          </Link>
        </Button>
      </div>
      <h1 className="text-2xl text-center text-zinc-700 capitalize">
        list of Users Registered
      </h1>

      {users && users.length > 0 ? (
        <Table className=" ">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Sl No.</TableHead>
              <TableHead>user Name</TableHead>
              <TableHead>email id </TableHead>
              <TableHead>id </TableHead>
              <TableHead>Role </TableHead>
              <TableHead>Status </TableHead>
              <TableHead> Photo </TableHead>
              <TableHead className="text-right">Reactivate</TableHead>
              <TableHead className="text-right">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, idx) => {
              return (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell>
                    <span
                      onClick={() => handleUserLink(user._id)}
                      className="cursor-pointer "
                    >
                      {user.displayName}
                    </span>
                  </TableCell>
                  {/* </Link> */}
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.userStatus}</TableCell>
                  <TableCell>
                    {
                      <img
                        src={user.photoURL || userLogo}
                        alt="photo"
                        className="size-10 rounded-full"
                      />
                    }
                  </TableCell>

                  <TableCell className="text-right ">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="size-8 btn-hover"
                      onClick={() => {
                        handleReactivateUser(user._id);
                      }}
                    >
                      {/* <RiEdit2Fill /> */}
                      <SiTicktick className="text-green-600" />
                    </Button>
                  </TableCell>
                  <TableCell className="text-right ">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="btn-hover text-destructive"
                      onClick={() => {
                        handleDeleteUser(user._id);
                      }}
                    >
                      <RiDeleteBin5Fill />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <div>
          <h1>No data to display</h1>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
