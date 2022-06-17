import React, {useCallback, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {deletePost, setPosts, sortPosts} from "../../../store/actions/postActions";
import {Spinner} from "react-bootstrap";
import EditPost from "./EditPost";
import {ARROWS_SVG, COLLAPSE_ARROWS, EXPAND_ARROWS} from "../../../utils/svg";
import {handleTitleInput} from "../../../utils/utils";
import AddPost from "./AddPost";

const Blog = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.filteredItems);
  const [openFilter, setOpenFilter] = useState(false);
  const [titlesList, setTitlesList] = useState([]);

  const initialState = {
    master_name: "",
    master_id: -1,
    masters: [],
  };
  const [queryParams, setQueryParams] = useState(initialState);

  const initSortParams = {
    id: '',
  };
  const [sortParams, setSortParams] = useState(initSortParams);

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

  const handleSort = (e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>, paramName: string) => {
    e.preventDefault();
    switch (paramName) {
      case "id": {
        setSortParams(prevState => ({
          id: prevState.id === "ASC" ? "DESC" : "ASC"
        }));
        dispatch(sortPosts(["id", sortParams.id]));
        break;
      }
      default: {
        break;
      }
    }
  };

  if (!arePostsReady) {
    return <Spinner animation="grow"/>;
  }
  return (
    <div className="container">
      <h2 className="text-left mt-5">Posts list</h2>
      <div className="d-flex mt-5 justify-content-between">
        <button className="btn m-4" type="button" data-toggle="collapse"
                data-target="#Filter" onClick={(e) => {
          e.preventDefault();
          setOpenFilter(!openFilter);
        }}
                aria-controls="Filter">Filter &nbsp;
          {!openFilter ? EXPAND_ARROWS : COLLAPSE_ARROWS}
        </button>
      </div>
      {openFilter && <div id="Filter">
        <div className="form-group">
          <div className="form-group">
            <label>Choose category</label>
            <input className="form-control" list="datalistOptions" name="master_id" autoComplete="on"
                   type="text" value={queryParams.master_name}
                   placeholder="Type to search..."
                   onChange={(e) => handleTitleInput(e, setQueryParams, setTitlesList, dispatch)}
            />
            <datalist id="datalistOptions">
              <option key="1" value="">---choose title---</option>
              {titlesList?.map((title: { post_id: number, title: string }, index) => {
                return (
                  <option key={index}
                          value={title.title}
                  />
                );
              })}
            </datalist>
          </div>
          <div className="form-group d-row">
            <button className="btn btn-outline-secondary"
                    onClick={() => {
                      dispatch({type: "POSTS.CLEAR_FILTERED"});
                      setQueryParams(initialState);
                    }}>Clear
            </button>
          </div>
        </div>
      </div>}
      <table className="table mt-5 text-justify">
        <thead>
        <tr>
          <th scope="col"
              onClick={(e) => handleSort(e, "id")}># {sortParams.id === "ASC" ? ARROWS_SVG.ASC : ARROWS_SVG.DESC}</th>
          <th scope="col">Creator</th>
          <th scope="col">Title</th>
          <th scope="col">Link</th>
          <th scope="col">Content</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
        </thead>
        <tbody>
        {posts?.map((post: any) => (
          <tr key={post.id}>
            <th scope="row"> {post.id}</th>
            <td>{post.creator}</td>
            <td>{post.title}</td>
            <td>{post.link}</td>
            <td>{post.content}</td>
            <td><EditPost post={post}/></td>
            <td>
              <button className="btn btn-danger"
                      onClick={() => dispatch(deletePost(post.id))}>Delete
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      {
        loadNext &&
        <div className="col text-center">
          <button className="btn btn-primary" onClick={(e) => handleNextPosts(e)} disabled={!arePostsReady}> More...
          </button>
        </div>
      }
      <AddPost/>
    </div>
  );
};

export default Blog;