import React, { useEffect, useState } from "react";

import CategoryPicker from "./CategoryPicker";
import PreviewImage from "./PreviewImage";
import MainImage from "./MainImage";

import { getCategory, getPost } from "./api.js";

function Gallery() {
  // State
  const [category, setCategory] = useState("top:week");
  const [posts, setPosts] = useState([]);
  const [photos, setPhotos] = useState({}); // Map of postIdx to array of photos objects
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
      // No posts loaded yet, don't do anything
      return;
    }

    setPhotoIdx(0);

    const fetchData = async () => {
      // TODO add some form of caching here to reduce calls to api
      // No need to call for posts that have already been fetched
      console.log("FETCHING PHOTOS WE ARE");
      let res;
      let topPost, midPost, botPost;
      if (postIdx - 1 >= 0) {
        res = await getPost(posts[postIdx - 1]);
        topPost = [res.original, ...res.photoshops];
      }

      res = await getPost(posts[postIdx]);
      midPost = [res.original, ...res.photoshops];

      if (postIdx + 1 < posts.length) {
        res = await getPost(posts[postIdx + 1]);
        botPost = [res.original, ...res.photoshops];
      }

      let setObj = {};
      let i;
      if (topPost) {
        i = postIdx - 1;
        setObj[i] = topPost;
      }
      if (midPost) {
        i = postIdx;
        setObj[i] = midPost;
      }
      if (botPost) {
        i = postIdx + 1;
        setObj[i] = botPost;
      }
      setPhotos(setObj);
    };

    fetchData();
  }, [posts, postIdx]);

  // console.log("------");
  // console.log("photos");
  // console.log(photos);
  // console.log("postIdx");
  // console.log(postIdx);
  // console.log("posts");
  // console.log(posts);
  // console.log(`postIdx: ${postIdx}  photoIdx: ${photoIdx}`);
  return (
    <>
      <CategoryPicker setCategory={setCategory} category={category} />
      <div>
        <PreviewImage
          display={postIdx > 0}
          alt={
            postIdx > 0 &&
            photos[postIdx - 1] &&
            photos[postIdx - 1][0] &&
            photos[postIdx - 1][0].text
          }
          url={
            postIdx > 0 &&
            photos[postIdx - 1] &&
            photos[postIdx - 1][0] &&
            photos[postIdx - 1][0].url
          }
          onClick={() => setPostIdx(postIdx - 1)}
        />
        <div className="flex flex-row justify-center items-center">
          <PreviewImage
            display={photoIdx > 0}
            alt={
              photos[postIdx] &&
              photos[postIdx][photoIdx - 1] &&
              photoIdx > 0 &&
              photos[postIdx][photoIdx - 1].text
            }
            url={
              photos[postIdx] &&
              photos[postIdx][photoIdx - 1] &&
              photoIdx > 0 &&
              photos[postIdx][photoIdx - 1].url
            }
            onClick={() => setPhotoIdx(photoIdx - 1)}
          />
          <MainImage
            alt={
              photos[postIdx] &&
              photos[postIdx][photoIdx] &&
              photos[postIdx][photoIdx].text
            }
            url={
              photos[postIdx] &&
              photos[postIdx][photoIdx] &&
              photos[postIdx][photoIdx].url
            }
          />
          <PreviewImage
            display={photos[postIdx] && photoIdx < photos[postIdx].length - 1}
            alt={
              photos[postIdx] &&
              photos[postIdx][photoIdx + 1] &&
              photoIdx < photos[postIdx].length + 1 &&
              photos[postIdx][photoIdx + 1].text
            }
            url={
              photos[postIdx] &&
              photos[postIdx][photoIdx + 1] &&
              photoIdx < photos[postIdx].length + 1 &&
              photos[postIdx][photoIdx + 1].url
            }
            onClick={() => setPhotoIdx(photoIdx + 1)}
          />
        </div>
        <PreviewImage
          display={postIdx < posts.length - 1}
          alt={
            postIdx < posts.length + 1 &&
            photos[postIdx + 1] &&
            photos[postIdx + 1][0] &&
            photos[postIdx + 1][0].text
          }
          url={
            postIdx < posts.length + 1 &&
            photos[postIdx + 1] &&
            photos[postIdx + 1][0] &&
            photos[postIdx + 1][0].url
          }
          onClick={() => setPostIdx(postIdx + 1)}
        />
      </div>
    </>
  );
}

export default Gallery;
