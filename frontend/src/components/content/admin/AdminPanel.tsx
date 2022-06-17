import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {deleteAcc, setUserInfo, updatePhoneNumber} from "../../../store/actions/userActions";

const Admin = () => {
  const dispatch = useAppDispatch();
  const id = useAppSelector((state) => state.user.id);
  const phone_number = useAppSelector((state) => state.user.phone_number);
  const [pN, setPN] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(setUserInfo(id));
      setPN(phone_number);
    }
  }, []);

  return (
    <div className="container">
      <h2 className="text-left mt-5">Welcome to Administration!</h2>
      <input value={pN} onChange={(e) => {
        setPN(e.target.value);
      }}
      />
      <button className="btn btn-warning" onClick={() => dispatch(updatePhoneNumber(id, pN))}>Update phone number
      </button>
      <div>
        <button className="btn btn-danger" onClick={() => dispatch(deleteAcc(id))}>Delete account</button>
      </div>
    </div>
  );
};

export default Admin;