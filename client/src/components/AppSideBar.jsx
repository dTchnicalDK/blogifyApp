import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router";
import logo from "@/assets/logo2.jpg";
import { IoHomeOutline } from "react-icons/io5";
import { GoDot, GoSidebarExpand } from "react-icons/go";
import { TbCategory } from "react-icons/tb";
import { ImBlog } from "react-icons/im";
import { FaRegCommentDots } from "react-icons/fa6";
import { FaUserSecret } from "react-icons/fa6";
import { useContext, useState } from "react";
import { CategoriesContext } from "@/contexts/CategoryContextProvider";
import { userContext } from "@/contexts/UserContexProvider";
// import { GoSidebarExpand } from "react-icons/go";
import { useSidebar } from "@/components/ui/sidebar";

const AppSideBar = () => {
  const { categories } = useContext(CategoriesContext);
  const { loggedUser } = useContext(userContext);
  const { toggleSidebar } = useSidebar();
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  switch (loggedUser?.role) {
    case "user":
      return (
        <Sidebar>
          <SidebarHeader>
            <div className="flex justify-around items-center">
              <img
                src={logo}
                alt=""
                width={"60px"}
                height={"60px"}
                className="rounded-full"
              />

              <h1 className="text-2xl font-extrabold text-orange-500 p-5">
                <span>My</span>
                <span className="text-sky-700">BlogApp</span>
              </h1>
            </div>

            <div className="relative top-0 left-63 text-3xl text-slate-500 z-30">
              <button onClick={toggleSidebar}>
                <GoSidebarExpand />
              </button>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/user">
                      <IoHomeOutline /> Home
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <ImBlog />
                    <Link to={"/user/my-blogs-details"}>MyBlogList</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <FaRegCommentDots />
                    <Link to={"/user/user-comments"}>MyComments</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>categories</SidebarGroupLabel>
              <SidebarMenu>
                {categories?.map((cat) => {
                  return (
                    <SidebarMenuItem key={cat._id}>
                      <SidebarMenuButton>
                        <GoDot />
                        <Link to={`/user/category-blogs/${cat._id}`}>
                          {cat.categoryName}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      );

      break;

    case "admin":
      return (
        <Sidebar>
          <SidebarHeader>
            <div className="flex justify-around items-center">
              <img
                src={logo}
                alt=""
                width={"60px"}
                height={"60px"}
                className="rounded-full"
              />

              <h1 className="text-2xl font-extrabold text-orange-500 p-5">
                <span>My</span>
                <span className="text-sky-700">BlogApp</span>
              </h1>
            </div>

            <div className="relative top-0 left-63 text-3xl text-slate-500 z-30">
              <button onClick={toggleSidebar} className="cursor-pointer">
                <GoSidebarExpand />
              </button>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/user">
                      <IoHomeOutline /> Home
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <TbCategory />
                    <Link to={"/admin/categories"}>Categories</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <FaRegCommentDots />
                    <Link to={"/admin/comment-details"}>Comments</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <FaUserSecret />
                    <Link to={"/admin/details"}>users</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <ImBlog />
                    <Link to={"/user/blogs-Details"}>Blogs list</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>categories</SidebarGroupLabel>
              <SidebarMenu>
                {categories?.map((cat) => {
                  return (
                    <SidebarMenuItem key={cat._id}>
                      <SidebarMenuButton>
                        <GoDot />
                        <Link to={`/user/category-blogs/${cat._id}`}>
                          {cat.categoryName}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      );
      break;

    default:
      return (
        <>
          <Sidebar>
            <SidebarHeader>
              <div className="flex justify-around items-center">
                <img
                  src={logo}
                  alt=""
                  width={"60px"}
                  height={"60px"}
                  className="rounded-full"
                />

                <h1 className="text-2xl font-extrabold text-orange-500 p-5">
                  <span>My</span>
                  <span className="text-sky-700">BlogApp</span>
                </h1>
              </div>

              <div className="relative top-0 left-63 text-3xl text-slate-500 z-30">
                <button onClick={toggleSidebar}>
                  <GoSidebarExpand />
                </button>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/user">
                        <IoHomeOutline /> Home
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel>categories</SidebarGroupLabel>
                <SidebarMenu>
                  {categories?.map((cat) => {
                    return (
                      <SidebarMenuItem key={cat._id}>
                        <SidebarMenuButton>
                          <GoDot />
                          <Link to={`/user/category-blogs/${cat._id}`}>
                            {cat.categoryName}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>footer</SidebarFooter>
          </Sidebar>
        </>
      );

      break;
  }
};

export default AppSideBar;
