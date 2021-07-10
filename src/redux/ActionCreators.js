import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

// CAMPSITES

export const fetchCampsites = () => (dispatch) => {
  dispatch(campsitesLoading());

  return fetch(baseUrl + "campsites")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        const errorMessage = new Error(error.message);
        throw errorMessage;
      }
    )
    .then((response) => response.json())
    .then((campsites) => dispatch(addCampsites(campsites)))
    .catch((error) => dispatch(campsitesFailed(error.message)));
};

export const campsitesLoading = () => ({
  type: ActionTypes.CAMPSITES_LOADING,
});

export const campsitesFailed = (error) => ({
  type: ActionTypes.CAMPSITES_FAILED,
  payload: error,
});

export const addCampsites = (campsites) => ({
  type: ActionTypes.ADD_CAMPSITES,
  payload: campsites,
});

// COMMENTS

export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + "comments")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        const errorMessage = new Error(error.message);
        throw errorMessage;
      }
    )
    .then((response) => response.json())
    .then((comments) => dispatch(addComments(comments)))
    .catch((error) => dispatch(campsitesFailed(error.message)));
};

export const commentsFailed = (errorMessage) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errorMessage,
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment,
});

export const postComment = (campsiteId, rating, author, text) => (dispatch) => {
  const newComment = {
    campsiteId,
    rating,
    author,
    text,
  };
  newComment.date = new Date().toISOString();

  return fetch(baseUrl + "comments", {
    method: "POST",
    body: JSON.stringify(newComment),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => dispatch(addComment(response)))
    .catch((error) => {
      console.log("post comment", error.message);
      alert("Your comment could not be posted\nError: " + error.message);
    });
};

// PROMOTIONS

export const fetchPromotions = () => (dispatch) => {
  dispatch(promotionsLoading());

  return fetch(baseUrl + "promotions")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        const errorMessage = new Error(error.message);
        throw errorMessage;
      }
    )
    .then((response) => response.json())
    .then((promotions) => dispatch(addPromotions(promotions)))
    .catch((error) => dispatch(promotionsFailed(error.message)));
};

export const promotionsLoading = () => ({
  type: ActionTypes.PROMOTIONS_LOADING,
});

export const promotionsFailed = (error) => ({
  type: ActionTypes.PROMOTIONS_FAILED,
  payload: error,
});

export const addPromotions = (promotions) => ({
  type: ActionTypes.ADD_PROMOTIONS,
  payload: promotions,
});

// PARTNERS

export const fetchPartners = () => (dispatch) => {
  dispatch(partnersLoading());

  return fetch(baseUrl + "partners")
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        const error = new Error(
          response`Error ${response.status}: ${response.statusText}`
        );
        error.response = response;
        throw error;
      }
    })
    .then((response) => response.json())
    .then((partners) => dispatch(addPartners(partners)))
    .catch((error) => dispatch(partnersFailed(error.message)));
};

export const partnersLoading = () => ({
  type: ActionTypes.PARTNERS_LOADING,
});

export const partnersFailed = (error) => ({
  type: ActionTypes.PARTNERS_FAILED,
  payload: error,
});

export const addPartners = (partners) => ({
  type: ActionTypes.ADD_PARTNERS,
  payload: partners,
});

export const postFeedback = (feedback) => ({
  
})