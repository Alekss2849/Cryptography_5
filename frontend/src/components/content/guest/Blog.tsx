import React, {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {setPosts} from "../../../store/actions/postActions";
import {Spinner} from "react-bootstrap";
import Post from "./Post";

const Blog = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.filteredItems);
  const postPage = useAppSelector((state) => state.posts.page);
  const loadNext = useAppSelector((state) => state.posts.loadNext);
  const arePostsReady = useAppSelector((state) => state.posts.isReady);

  useEffect(() => {
    if (posts.length <= 0) {
      dispatch(setPosts(postPage, ""));
    }
  }, []);

  const handleNextPosts = useCallback((e: any) => {
    e.target.disabled = true;
    dispatch(setPosts(postPage, ""));
    e.target.disabled = false;
  }, [postPage]);

  if (!arePostsReady) {
    return <Spinner animation="grow"/>;
  }
  return (
    <div className="container">
      {posts.map((post: any, index: number) => {
        return (
          <Post
            post={post}
            key={`Blog${index}`}
          />
        );
      })}
      {
        loadNext &&
        <div className="col text-center">
          <button className="btn btn-primary" onClick={(e) => handleNextPosts(e)} disabled={!arePostsReady}> More...
          </button>
        </div>
      }
    </div>
  );
};

export default Blog;