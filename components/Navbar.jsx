import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Style from "../styles/components/Navbar.module.css";
import { BsGithub } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { DiCss3 } from "react-icons/di";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

function Navbar() {
  const router = useRouter();
  const navLinks = [
    { text: "Code converter", endpoint: "/" },
    { text: "PDF Reader", endpoint: "/PdfReader" },
    { text: "CSS Prefixer", endpoint: "/PreFixer" },
  ];

  return (
    <nav className={Style.navbar}>
      <h1 className={Style.nanTitle}>Creative.AI</h1>
      <ul className={Style.navlinks}>
        {navLinks.map((link) => (
          <Link
            href={link.endpoint}
            className={
              router.pathname == link.endpoint ? Style.active : Style.Inactive
            }
          >
            {link.text}
          </Link>
        ))}
      </ul>
      <BsGithub className={Style.navGitIcon} size={"30px"}/>
      <div className={Style.NavHamburger}>
        <Menu>
          <MenuButton>
            <GiHamburgerMenu />
          </MenuButton>
          <MenuList>
            <MenuItem icon={<DiCss3 />}>
              <Link
                href="/"
                className={
                  router.pathname == "/" ? Style.active : Style.Inactive
                }
              >
                Code Converter
              </Link>
            </MenuItem>
            <MenuItem icon={<DiCss3 />}>
              <Link
                href="/PreFixer"
                className={
                  router.pathname == "/PreFixer" ? Style.active : Style.Inactive
                }
              >
                CSS PreFixer
              </Link>
            </MenuItem>
            <MenuItem icon={<DiCss3 />}>
              <Link
                href="PdfReader"
                className={
                  router.pathname == "PdfReader" ? Style.active : Style.Inactive
                }
              >
                PDF Reader
              </Link>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </nav>
  );
}

export default Navbar;
