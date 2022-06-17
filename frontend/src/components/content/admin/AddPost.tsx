import React, {FormEvent, useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import {addPost, updatePost} from "../../../store/actions/postActions";

const EditCustomer = () => {
  const dispatch = useDispatch();
  const [creator, setCreator] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [content, setContent] = useState("");
  const inputRef = React.useRef(null);

  const editPost = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {creator, link, content, title, content_snippet: content, isoDate: new Date(), active: true};
    // @ts-ignore
    dispatch(addPost(body));
    // @ts-ignore
    inputRef.current.click();
  }, [dispatch, creator, link, content]);

  return (
    <div>
      <button type="button" className="btn btn-success" data-toggle="modal"
              data-target={`#add`}>
        Add
      </button>

      <div className="modal fade" id={`add`} tabIndex={-1} role="dialog"
           aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <form onSubmit={(event) => editPost(event)}>
              <div className="modal-header">
                <h2 className="modal-title" id="exampleModalLabel">Add post information</h2>
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
                  Add
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