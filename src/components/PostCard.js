import React, { useState } from "react";

function PostCard({ post }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  return (
    <div className="flex flex-row border h-full w-full">
      <div className="relative my-auto w-full">
        <img
          className="block w-full"
          alt={"Photo"}
          src={post.photos[photoIndex] && post.photos[photoIndex].url}
        ></img>
        {photoIndex > 0 && (
          <button
            onClick={() => setPhotoIndex(photoIndex - 1)}
            className="rounded-full h-16 w-16 flex items-center justify-center bg-gray-200 absolute inset-y-0 left-0 my-auto ml-8"
          >
            {"<"}
          </button>
        )}
        {photoIndex < post.photos.length - 1 && (
          <button
            onClick={() => setPhotoIndex(photoIndex + 1)}
            className="rounded-full h-16 w-16 flex items-center justify-center bg-gray-200 absolute inset-y-0 right-0 my-auto mr-8"
          >
            {">"}
          </button>
        )}
      </div>
    </div>
  );
}

export default PostCard;
