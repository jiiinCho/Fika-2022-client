import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IHeart, ILocation } from "@components/icons";
import { Avatar } from "@components/index";
import s from "@styles/components/Post.module.css";
import { PostT } from "@interface/index";
import { useRouter } from "next/router";
import { useAuthContext } from "context/AuthContext";
import fetcher from "@network/fetcher";

type Props = {
  post: PostT;
  onDislike?: (postId: string) => void;
  liked?: boolean;
};

export default function Post({ post, onDislike, liked = false }: Props) {
  const [likedPost, setLikedPost] = useState<boolean>(false);

  const {
    user: { username, avatar },
    imgUrl,
    id,
  } = post;

  const router = useRouter();
  const authService = useAuthContext();

  useEffect(() => {
    setLikedPost(liked);
  }, [liked]);

  // useEffect(() => {
  //   async function getCurrUser() {
  //     if (authService) {
  //       const currUser = await authService.getUser();
  //       if (currUser && currUser.likedPosts.length) {
  //         const found = currUser.likedPosts.filter((postId) => postId === id);
  //         found.length && setLikedPost(true);
  //       }
  //     }
  //   }
  //   getCurrUser();
  // }, [authService, id]);

  const handleOnBtnClick = async () => {
    if (authService) {
      const currUser = await authService.getUser();
      if (currUser) {
        const { liked } = await fetcher("/api/updateLikesHandler", {
          postId: id,
          userId: currUser.id,
          accessToken: currUser.accessToken,
        });
        setLikedPost(liked);
        onDislike && onDislike(id);
        //[TODO] because there is no getUser api
        // currUser.likedPosts = liked
        //   ? [...currUser.likedPosts, id]
        //   : currUser.likedPosts.filter((pid) => pid !== id);
      } else {
        router.push("/signIn");
      }
    }
  };

  return (
    <article className={s.container}>
      <div className={s.imgWrapper}>
        <Image
          src={imgUrl}
          alt="Post"
          width="100%"
          height={420}
          objectFit="cover"
        />
      </div>
      <div className={s.meta}>
        <button className="btn-reset" type="button" onClick={handleOnBtnClick}>
          <IHeart color={`${likedPost ? "icon-primary" : "icon-white"}`} />
        </button>
        <div className="flex" style={{ justifyContent: "space-between" }}>
          <Link href={`/post/${id}`}>
            <a style={{ color: "inherit", textDecoration: "none" }}>
              <Avatar username={username} avatar={avatar} />
            </a>
          </Link>
          <button className="btn-reset">
            <ILocation color="icon-white" />
          </button>
        </div>
      </div>
    </article>
  );
}
