import {Dispatch} from "@reduxjs/toolkit";
import {ChangeEvent, SetStateAction} from "react";
import {apiGet} from "../http/httpPlaceholder";
import {ACTIONS} from "./constants";

export const objectToQueryString = (object: any) => {
  let string = "";
  if (object?.title?.length > 0) {
    string += (`&title=${object?.title}`);
  }
  return string;
};

export const hasNumber = (myString: string) => {
  return /\d/.test(myString);
};

export const handleTitleInput = (e: ChangeEvent<HTMLInputElement>, setQueryParams: { (value: SetStateAction<{ master_name: string; master_id: number; masters: never[]; }>): void; (arg0: { (prevState: any): any; (prevState: { masters: any; }): { master_name: any; master_id: any; masters: any[]; }; (prevState: any): any; }): void; }, setMastersList: { (value: SetStateAction<never[]>): void; (arg0: any): void; }, dispatch: Dispatch<any>) => {
  e.preventDefault();
  const {name, value} = e.target;
  if (!hasNumber(value)) {
    apiGet({
      url: `posts/offset/0?title=${value}`
    }).then(({data}) => {
        setMastersList(data);
        dispatch({
          type: ACTIONS.POSTS.SET_FILTERED_ARRAY,
          payload: data
        });
      }
    );
    setQueryParams((prevState: any) => ({
      ...prevState,
      [name]: "",
      master_name: value
    }));
  } else {
    setQueryParams((prevState: { masters: any; }) => ({
      ...prevState,
      [name]: value.split("|")[0],
      master_name: value.split("|")[1],
      master_id: value.split("|")[0],
      masters: [...prevState.masters, value.split("|")[0]]
    }));
    setQueryParams(prevState => ({
      ...prevState,
      masters: prevState.masters.sort().filter(function (item, pos, ary) {
        return !pos || item != ary[pos - 1];
      })
    }));
    e.target.value = value.replace(/[0-9|]/g, '');
  }
};