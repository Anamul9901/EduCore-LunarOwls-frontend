"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { logout, selectCurrentUser } from "@/src/redux/features/auth/authSlice";

const NavberDropdown = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectCurrentUser);
  const userId = (user as any)?.id;
  const userRole = (user as any)?.role;
  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  const handleLogOut = () => {
    dispatch(logout());
  };

  // for hybration error handle
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar className="cursor-pointer" name="ana" />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">

       
          <DropdownItem
            onClick={() => handleNavigation("/dashboard?key=dashboard")}
          >
            Dashboard
          </DropdownItem>

        <DropdownItem
          onClick={() => handleLogOut()}
          className="text-danger"
          color="danger"
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavberDropdown;
