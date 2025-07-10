import React, { useContext } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { userContext } from "@/contexts/UserContexProvider";
import { Navigate, useNavigate } from "react-router";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { TbEdit } from "react-icons/tb";

function Profile() {
  const { loggedUser } = useContext(userContext);
  const navigate = useNavigate();

  console.log(loggedUser);
  if (!loggedUser) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="min-w-2/3">
      <Card>
        <CardHeader className="relative">
          <CardTitle>Your Profile informations</CardTitle>
          <CardDescription>Here are the personal informations</CardDescription>
          <Button
            variant="outline"
            onClick={() => {
              navigate("/user/update-profile");
            }}
            className="absolute right-5.5 top-1.5"
          >
            <TbEdit />
            Edit
          </Button>
        </CardHeader>
        <Separator />
        <CardContent>
          <p>
            Display Name: <span>{loggedUser.displayName}</span>
          </p>
        </CardContent>
        <CardContent>
          <h3>email: {loggedUser.email}</h3>
        </CardContent>
        <CardContent>
          <h3>created at: {loggedUser.createdAt}</h3>
        </CardContent>
        <CardContent>
          <h3>updated at: {loggedUser.updatedAt}</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default Profile;
