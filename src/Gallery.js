import React, { useEffect, useState } from "react";

import CategoryPicker from "./CategoryPicker";
import PreviewImage from "./PreviewImage";
import MainImage from "./MainImage";

import { getCategory, getPost } from "./api.js";

function Gallery() {
  // State
  const [category, setCategory] = useState("hot");
  const [posts, setPosts] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [postIdx, setPostIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(0);

  useEffect(() => {
    // Everytime category is changed:
    // load posts for category from api
    // reset post and photo indexes
    getCategory(category).then(res => {
      setPosts(res.posts);
      setPostIdx(0);
      setPhotoIdx(0);
    });
  }, [category]);

  useEffect(() => {
    // Everytime postIdx is changed:
    // load all of the photos for that post from api
    // reset photo index
    if (!posts[0]) {
      return;
    }
    getPost(posts[postIdx]).then(res => {
      setPhotos([res.original, ...res.photoshops]);
      setPhotoIdx(0);
    });
  }, [posts, postIdx]);
  console.log(photos);
  return (
    <>
      <CategoryPicker setCategory={setCategory} category={category} />
      <div>
        <PreviewImage
          display={postIdx > 0}
          alt={"alt text here"}
          url={"/test/1.jpg"}
          onClick={() => setPostIdx(postIdx - 1)}
        />
        <div className="flex flex-row justify-center items-center">
          <PreviewImage
            display={photoIdx > 0}
            alt={photos[0] && photoIdx > 0 ? photos[photoIdx - 1].text : ""}
            url={photos[0] && photoIdx > 0 ? photos[photoIdx - 1].url : ""}
            onClick={() => setPhotoIdx(photoIdx - 1)}
          />
          <MainImage
            alt={photos[0] ? photos[photoIdx].text : ""}
            url={photos[0] ? photos[photoIdx].url : ""}
          />
          <PreviewImage
            display={photoIdx < photos.length}
            alt={
              photos[0] && photoIdx < posts.length
                ? photos[photoIdx + 1].text
                : ""
            }
            url={
              photos[0] && photoIdx < posts.legnth
                ? photos[photoIdx + 1].url
                : ""
            }
            onClick={() => setPhotoIdx(photoIdx + 1)}
          />
        </div>
        <PreviewImage
          display={postIdx < posts.length}
          alt={"alt text here"}
          url={"/test/4.gif"}
          onClick={() => setPostIdx(postIdx + 1)}
        />
      </div>
    </>
  );
}

export default Gallery;
