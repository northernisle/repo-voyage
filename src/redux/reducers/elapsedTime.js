import {
  SET_ELAPSED_DELEGATIONS,
  SET_ELAPSED_TIME,
  RESET_ELAPSED_TIME
} from '../actions/actionTypes';

let accumulator = 0;
let delegationsLeft = 0;

export default (elapsed = null, action) => {
  switch (action.type) {
    /*
      this will accumulate all the incoming values and only update the store when
      there are no delegations left; defaults to 0 delegations (i.e. no accumulation)
    */
    case SET_ELAPSED_TIME:
      delegationsLeft -= delegationsLeft ? 1 : 0;
      accumulator += action.payload;

      if (!delegationsLeft) {
        const result = accumulator;
        accumulator = 0;
        return result;
      }
      return null;

    case SET_ELAPSED_DELEGATIONS:
      delegationsLeft = action.payload > 0 ? action.payload : 0;
      return null;

    case RESET_ELAPSED_TIME:
      return null;

    default:
      return elapsed;
  }
};
