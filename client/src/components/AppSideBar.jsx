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

const AppSideBar = () => {
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
              <SidebarMenuButton>
                <IoHomeOutline />
                <Link>home</Link>
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
                <Link>Blogs</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <FaRegCommentDots />
                <Link>Comments</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <FaUserSecret />
                <Link>users</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarGroup>
              <SidebarGroupLabel>categories</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <GoDot />
                    <Link>New group item</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <GoDot />
                    <Link>New group item</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <GoDot />
                    <Link>New group item</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
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
