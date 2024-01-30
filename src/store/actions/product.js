import axios from "axios";

export const getProducts = () => (dispatch) => {
  axios.get('http://localhost:8082/product/all')
    .then(response => {
      dispatch({
        type: 'GET_LIST',
        payload: response.data
      });
    })
    .catch(error => {
      // Handle error if needed
      console.error("Error fetching products:", error);
      // Optionally dispatch an error action
      // dispatch({ type: 'GET_LIST_ERROR', payload: error });
    });
};

export const updateProductFeatures = (id, status) => (dispatch) => {
  axios.put('http://localhost:8082/product/update', {
    'id': id,
    'status': status
  })
    .then(() => {
      dispatch({
        type: 'UPDATE_PRODUCT',
        payload: {
          'id': id,
          'status': status
        }
      });
    })
    .catch(error => {
      // Handle error if needed
      console.error("Error updating product feature:", error);
      // Optionally dispatch an error action
      // dispatch({ type: 'UPDATE_PRODUCT_ERROR', payload: error });
    });
};
