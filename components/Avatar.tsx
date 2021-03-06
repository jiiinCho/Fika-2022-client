import React from "react";
import Image from "next/image";
import s from "@styles/components/Avatar.module.css";

type Props = {
  avatar: string;
  username: string;
  textColor?: string;
};
export default function Avatar({ avatar, username, textColor }: Props) {
  return (
    <div className="flex g-50" style={{ alignItems: "center" }}>
      <div className={s.container}>
        <Image
          src={avatar}
          alt="avatar"
          width={62}
          height="100%"
          objectFit="cover"
        />
      </div>
      <p
        className={`ff-montserrat fs-16 fw-semibold ${
          textColor ? textColor : "text-white"
        }`}
      >
        {username}
      </p>
    </div>
  );
}
