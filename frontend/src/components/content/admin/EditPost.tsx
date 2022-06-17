import React, {FormEvent, useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import {updatePost} from "../../../store/actions/postActions";

const EditCustomer = ({post}: any) => {
  const dispatch = useDispatch();
  const [creator, setCreator] = useState(post.creator);
  const [title, setTitle] = useState(post.title);
  const [link, setLink] = useState(post.link);
  const [content, setContent] = useState(post.content);
  const inputRef = React.useRef(null);

  const editPost = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {creator, link, content};
    // @ts-ignore
    dispatch(updatePost(body, post.id));
    // @ts-ignore
    inputRef.current.click();
  }, [dispatch, post.id, creator, link, content]);

  return (
    <div>
      <button type="button" className="btn btn-warning" data-toggle="modal"
              data-target={`#id${post.id}`}>
        Edit
      </button>

      <div className="modal fade" id={`id${post.id}`} tabIndex={-1} role="dialog"
           aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <form onSubmit={(event) => editPost(event)}>
              <div className="modal-header">
                <h2 className="modal-title" id="exampleModalLabel">Edit post information</h2>
                <button type="button" className="close" data-dismiss="modal">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <label>Creator</label>
                <input className="form-control" value={creator}
                       onChange={e => setCreator(e.target.value)} required
                />
                <label>Title</label>
                <input className="form-control" value={title}
                       onChange={e => setTitle(e.target.value)} required
                />
                <label>Link</label>
                <input className="form-control" value={link}
                       onChange={e => setLink(e.target.value)} required
                />
                <label>HTML-Content</label>
                <textarea className="form-control" value={content}
                          onChange={e => setContent(e.target.value)} required
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal"
                        ref={inputRef}>Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCustomer;