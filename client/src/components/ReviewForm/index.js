import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_REVIEW } from "../../utils/mutations";
import { QUERY_REVIEWS, QUERY_ME, } from "../../utils/queries";

const ReviewForm = () => {

  const [addReview, { error }] = useMutation(ADD_REVIEW, {
    update(cache, { data: { addReview } }) {
      try {
        // could potentially not exist yet, so wrap in a try...catch
        const { reviews } = cache.readQuery({ query: QUERY_REVIEWS });
        cache.writeQuery({
          query: QUERY_REVIEWS,
          data: { reviews: [addReview, ...reviews] }
        });
      } catch (e) {
        console.error(e);
      }
  
      // update me object's cache, appending new review to the end of the array
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, reviews: [...me.reviews, addReview] } }
      });
    }
  });

  const [reviewText, setText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async event => {
  event.preventDefault();

  try {
    // add review to database
    await addReview({
      variables: { reviewText }
    });

    // clear form value
    setText('');
    setCharacterCount(0);
  } catch (e) {
    console.error(e);
  }
};

  return (
    <div>
      <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
        </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Here's a new review..."
          value={reviewText}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
