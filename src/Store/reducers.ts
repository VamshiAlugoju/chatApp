import { Adduser } from "./actiontypes";

const userInitialState: any = {};

export default function userReducer(state = userInitialState, action: any) {
  switch (action.type) {
    case Adduser:
      return {
        ...state,
        numOfItems: state.numOfItems + 1,
      };
    default:
      return state;
  }
}
