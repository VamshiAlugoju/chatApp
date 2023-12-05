import { Adduser, updateReciever, updateUser } from "./actiontypes";
import { combineReducers } from "redux";
const userInitialState: any = {};

export function userReducer(state = userInitialState, action: any) {
  switch (action.type) {
    case Adduser:
      return {
        ...action.payload,
      };
    case updateUser: {
      let data = [action.payload];
      data = [...data, ...state.chatList];
      return {
        ...state,
        chatList: data,
      };
    }

    default:
      return state;
  }
}

const recieverInitialState: any = {};
export function recieverReducer(state = recieverInitialState, action: any) {
  switch (action.type) {
    case updateReciever:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  user: userReducer,
  receiver: recieverReducer,
});

export default rootReducer;
