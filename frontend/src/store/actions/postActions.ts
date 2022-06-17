import {ACTIONS} from "../../utils/constants";
import {apiDelete, apiGet, apiPost, apiPut} from "../../http/httpPlaceholder";

type Post = {
  id: number,
  creator: string,
  link: string,
  title: string,
  isoDate: string,
  content: string,
  content_snippet: string
}

export const setPosts = (page: number, queryString: string) => {
  return async (dispatch: any) => {
    const {data}: any = await apiGet({
      url: `/posts/offset/${page}?${queryString}`
    })
    dispatch({
      type: ACTIONS.POSTS.SET_POSTS,
      payload: data
    });
  }
}

export const setReadyPosts = () => (isReady: boolean) => ({
  type: ACTIONS.POSTS.SET_READY_POSTS,
  payload: isReady
});

export const updatePost = (post: Post, id: number) => {
  return async (dispatch: any) => {
    const {data} = await apiPut({
      data: post,
      url: `/posts/${id}`
    })
    dispatch({
      type: ACTIONS.POSTS.UPDATE_POST,
      payload: data
    });
  }
}

export const addPost = (post: Post) => {
  return async (dispatch: any) => {
    const {data} = await apiPost({
      data: post,
      url: "/posts"
    })
    dispatch({
      type: ACTIONS.POSTS.ADD_POST,
      payload: data
    })
  }
}

export const deletePost = (id: number) => {
  return async (dispatch: any) => {
    await apiDelete({
      url: `/posts/${id}`
    })
    dispatch({
      type: ACTIONS.POSTS.DELETE_POST,
      payload: id
    });
  }
}

export const sortPosts = (param: string[]) => {
  return (dispatch: any) => {
    dispatch({
      type: ACTIONS.POSTS.SORT,
      payload: param
    })
  }
}
