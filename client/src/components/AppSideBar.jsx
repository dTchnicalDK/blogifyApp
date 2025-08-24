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
import { GoDot } from "react-icons/go";
import { TbCategory } from "react-icons/tb";
import { ImBlog } from "react-icons/im";
import { FaRegCommentDots } from "react-icons/fa6";
import { FaUserSecret } from "react-icons/fa6";
import { useContext } from "react";
import { CategoriesContext } from "@/contexts/CategoryContextProvider";

const AppSideBar = () => {
  const { categories } = useContext(CategoriesContext);

  const handleCategoryBlog = (categoryId) => {
    console.log("handleCategoryBlog triggered");
  };

  return (
    <div>
      <Sidebar>
        <SidebarHeader>
          <img src={logo} alt="" width={"70px"} height={"70px"} />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup />
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
                <Link to={"/user/categories"}>Categories</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <ImBlog />
                <Link to={"/user/blogs-Details"}>Blogs</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <FaRegCommentDots />
                <Link to={"/user/comment-details"}>Comments</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <FaUserSecret />
                <Link to={"/user/details"}>users</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarGroup>
              <SidebarGroupLabel>categories</SidebarGroupLabel>
              <SidebarMenu>
                {categories?.map((cat) => {
                  return (
                    <SidebarMenuItem key={cat._id}>
                      <SidebarMenuButton
                      // onClick={() => handleCategoryBlog(cat._id)}
                      >
                        <GoDot />
                        <Link to={`category-blogs/${cat._id}`}>
                          {cat.categoryName}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    </div>
  );
};

export default AppSideBar;
