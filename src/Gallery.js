import React, { useEffect, useState } from "react";

import CategoryPicker from "./CategoryPicker";
import PreviewImage from "./PreviewImage";
import MainImage from "./MainImage";

import { getCategory, getPost } from "./api.js";

function Gallery() {
  // State
  const [category, setCategory] = useState("hot");
  const [posts, setPosts] = useState([]);
  const [photos, setPhotos] = useState({}); // Map of postIdx to array of photos objects
  const [postIdx, setPostIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(0);

  useEffect(() => {
    // Everytime category is changed:
    // load posts for category from api
    // reset post and photo indexes
    console.log("loading categories");
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
      // No posts loaded yet, don't do anything
      return;
    }
    console.log("loading photos");

    setPhotoIdx(0);

    let promiseChain = Promise.resolve();
    let loadIdx = postIdx - 1;
    if (loadIdx >= 0 && !photos.hasOwnProperty(loadIdx)) {
      console.log("start");
      // Load post in top row if not already loaded
      promiseChain = promiseChain.then(() => {
        getPost(posts[loadIdx]).then(res => {
          let setObj = {};
          setObj[loadIdx] = [res.original, ...res.photoshops];
          setPhotos(setObj);
        });
      });
    }

    loadIdx = postIdx;
    if (!photos.hasOwnProperty(loadIdx)) {
      console.log("middle");
      // Load post in middle row if not already loaded
      promiseChain = promiseChain.then(() => {
        getPost(posts[loadIdx]).then(res => {
          let setObj = {};
          setObj[loadIdx] = [res.original, ...res.photoshops];
          setPhotos(setObj);
        });
      });
    }

    loadIdx = postIdx + 1;
    if (loadIdx < posts.length && !photos.hasOwnProperty(loadIdx)) {
      console.log("end");
      // Load post in bottom row if not already loaded
      promiseChain = promiseChain.then(() => {
        getPost(posts[loadIdx]).then(res => {
          let setObj = {};
          setObj[loadIdx] = [res.original, ...res.photoshops];
          setPhotos(setObj);
        });
      });
    }
    console.log("promiseChain");
    console.log(promiseChain);
    return promiseChain;
  }, [posts, postIdx]);

  console.log("------");
  console.log("photos");
  console.log(photos);
  // console.log("postIdx");
  // console.log(postIdx);
  // console.log("posts");
  // console.log(posts);
  return (
    <>
      <CategoryPicker setCategory={setCategory} category={category} />
      <div>
        <PreviewImage
          display={postIdx > 0}
          alt={
            postIdx > 0 && photos[postIdx - 1] && photos[postIdx - 1][0].text
          }
          url={postIdx > 0 && photos[postIdx - 1] && photos[postIdx - 1][0].url}
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
          display={postIdx < posts.length - 1}
          alt={
            postIdx < posts.length - 1 &&
            photos[postIdx + 1] &&
            photos[postIdx + 1][0].text
          }
          url={
            postIdx < posts.length - 1 &&
            photos[postIdx + 1] &&
            photos[postIdx + 1][0].url
          }
          onClick={() => setPostIdx(postIdx + 1)}
        />
      </div>
    </>
  );
}

export default Gallery;
