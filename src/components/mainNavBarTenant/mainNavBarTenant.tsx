// import { useNavigate } from "react-router";
import {
  NavigationMenu,
  NavigationMenuContent,
  // NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  // NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import lawang_logo from "../../../public/lawang_logo.png";
import React from "react";
// import { Link } from "react-router-dom";
// import { Bold } from "lucide-react";

const MainNavBarTenant: React.FC = () => {
  /////// TestAPI
  // const { data: user, isFetched } = useQuery({
  //   queryKey: ["user"],
  //   queryFn: async () => {
  //     const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  //     return res.data;
  //   },
  // });

  // const navigate = useNavigate();

  // const menuComponents: { title: string; href: string; description: string }[] = [
  //   {
  //     title: "Home",
  //     href: "/",
  //     description: "Back To Home Page",
  //   },
  //   {
  //     title: "",
  //     href: "/tenantProperty",
  //     description: "Back To Home Page",
  //   },
  // ];

  return (
    <>
      <br />
      <h1>TENANT PAGE</h1>
      <br />
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Property Management</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/tenant"
                    >
                      <img src={lawang_logo}></img>
                      <div className="mb-2 mt-4 text-lg font-medium">Home</div>
                      <p className="text-sm leading-tight text-muted-foreground">Takes you to Tenant Home Page</p>
                    </a>
                  </NavigationMenuLink>
                </li>

                <li>
                  {" "}
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/tenant/propertyAdder"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        <text>Add Property</text>
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">Add New Property to Your Portfolio</p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li>
                  {" "}
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/tenant/transactions"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        <text>Orders & Report</text>
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">View User Orders & Sales Reports</p>
                    </a>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

export default MainNavBarTenant;
