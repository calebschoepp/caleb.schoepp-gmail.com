import React, { useState, useEffect } from "react";

import { TITLE_BAR_SIZE, BORDER_COLOR } from "../util/constants.js";

function PostCard({ post }) {
  const [photoIndex, setPhotoIndex] = useState(0);

  // Preload all the images for this postcard
  useEffect(() => {
    if (!post) {
      return;
    }
    for (const photo of post.photos) {
      const image = new Image();
      image.src = photo.url;
    }
  }, [post]);

  return (
    <div
      className={`flex flex-col h-full w-full bg-white border border${BORDER_COLOR}`}
    >
      <div
        style={{ height: `${TITLE_BAR_SIZE}px` }}
        className={`bg-white flex flex-row justify-start items-center content-center border-b border${BORDER_COLOR} text-lg`}
      >
        <a
          href={post.postLink}
          className="ml-1 overflow-hidden whitespace-no-wrap"
          target="_blank"
        >
          {post.photos[photoIndex].text}
        </a>
        <span className="mx-2 font-semibold">|</span>
        <span className="mr-1">{post.photos[photoIndex].score}</span>
      </div>
      <div className="relative my-auto w-full">
        <img
          className="block w-full"
          alt={post.photos[photoIndex] && post.photos[photoIndex].text}
          src={post.photos[photoIndex] && post.photos[photoIndex].url}
        ></img>
        {photoIndex > 0 && (
          <img
            className="rounded-full h-12 w-12 opacity-50 lg:hover:opacity-100 flex items-center justify-center bg-gray-100 absolute inset-y-0 left-0 my-auto ml-8"
            src="/chevron-left.svg"
            onClick={() => setPhotoIndex(photoIndex - 1)}
          ></img>
        )}
        {photoIndex < post.photos.length - 1 && (
          <img
            className="rounded-full h-12 w-12 opacity-50 lg:hover:opacity-100 flex items-center justify-center bg-gray-100 absolute inset-y-0 right-0 my-auto mr-8"
            src="/chevron-right.svg"
            onClick={() => setPhotoIndex(photoIndex + 1)}
          ></img>
        )}
      </div>
    </div>
  );
}

export default PostCard;
