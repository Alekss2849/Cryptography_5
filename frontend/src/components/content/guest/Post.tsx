import React from 'react';
import ReactHtmlParser from 'react-html-parser'

const Post = (props: any) => {
  const {post} = props;
  return (
    <div className="col-sm">
      <h1>{post.title}</h1>
      <div>{ReactHtmlParser(post.content)}</div>
    </div>
  );
};

export default Post;
