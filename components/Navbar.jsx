import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Style from "../styles/components/Navbar.module.css";
import { BsGithub } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import {Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import Image from "next/image";
require("dotenv").config;

function Navbar({ token }) {
  const navLinks = [
    { text: "Code converter", endpoint: "/" },
    { text: "PDF Reader", endpoint: "/PdfReader" },
    { text: "CSS Prefixer", endpoint: "/PreFixer" },
  ];

  const router = useRouter();

  function connectUser() {
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/git_login`);
  }

  return (
    <nav className={Style.navbar}>
      <h1 className={Style.nanTitle}>Creative.AI</h1>
      <ul className={Style.navlinks}>
        {navLinks.map((link, ind) => (
          <Link
            key={ind}
            href={link.endpoint}
            className={
              router.pathname == link.endpoint ? Style.active : Style.Inactive
            }
          >
            {link.text}
          </Link>
        ))}
      </ul>
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        {token.username && token.image ? (
          <div className={Style.profilePhoto}>
            <img src={token.image} alt="Profile" />
            <p>{token.username}</p>
          </div>
        ) : (
          <BsGithub
            className={Style.navGitIcon}
            size={"25px"}
            onClick={connectUser}
          />
        )}

        <div className={Style.NavHamburger}>
          <Menu>
            <MenuButton>
              <GiHamburgerMenu size={"25px"} />
            </MenuButton>
            <MenuList
              display={"flex"}
              flexDirection={"column"}
              paddingBottom={'5px'}
            >
              {navLinks.map((link, ind) => (
                <Link
                  key={ind}
                  href={link.endpoint}
                  className={
                    router.pathname == link.endpoint ? Style.active : Style.Inactive
                  }
                >
                  <MenuItem bgColor={'black'} color={'white'}>{link.text}</MenuItem>
                </Link>
              ))}
            </MenuList>
          </Menu>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
