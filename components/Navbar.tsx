import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import s from "@styles/components/Navbar.module.css";
import { IHeart, IPlus, ISearch, IUser } from "@components/icons";

type Props = {
  headerRef: React.MutableRefObject<null | HTMLDivElement>;
};

export default function Navbar({ headerRef }: Props) {
  const navRef = useRef<HTMLDivElement>(null);
  const [headerPosY, setHeaderPosY] = useState(0);
  const [display, setDisplay] = useState(false);

  const handleOnScroll = useCallback(() => {
    headerRef.current &&
      setHeaderPosY(headerRef.current.getBoundingClientRect().y);
  }, [headerRef]);

  useEffect(() => {
    window.addEventListener("scroll", handleOnScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleOnScroll);
    };
  }, [handleOnScroll]);

  useEffect(() => {
    if (headerRef.current && navRef.current) {
      const boundary =
        headerRef.current.offsetHeight - navRef.current.offsetHeight;

      const navHeight = navRef.current.offsetHeight;
      const hitLine = Math.abs(headerPosY) - navHeight * 0.5;
      const diff = boundary - hitLine; //466 - 25 > 0 && hidden
      boundary && diff < 0 ? setDisplay(true) : setDisplay(false);
    }
  }, [headerPosY, headerRef]);

  return (
    <nav ref={navRef} className={`grid ${s.nav} ${display && "nav-wrapper"}`}>
      <div className={s.iconWrapper}>
        <div className={`${display ? s.appear : s.disappear}`}>
          <Link href="/">
            <a>
              <p className="fs-28 ff-branding text-accent uppercase ml-25">
                fika
              </p>
            </a>
          </Link>
        </div>
      </div>
      <ul className="flex">
        <div className={s.iconWrapper}>
          <li className={`${display ? s.appear : s.disappear}`}>
            <Link href="#">
              <a>
                <ISearch color="icon-white" />
              </a>
            </Link>
          </li>
        </div>

        <li className={s.list}>
          <Link href="#">
            <a>
              <IPlus color="icon-white" />
            </a>
          </Link>
        </li>
        <li className={s.list}>
          <Link href="#">
            <a>
              <IHeart color="icon-white" />
            </a>
          </Link>
        </li>

        <li className={s.list}>
          <Link href="#">
            <a>
              <IUser color="icon-white" />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
