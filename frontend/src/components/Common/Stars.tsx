const stars = (rating: number) => {
  const roundedRating = Math.round(rating * 10) / 10;
  const starCount = Math.min(5, Math.max(0, roundedRating));
  const fullStars = Math.floor(starCount);
  const hasHalfStar = starCount - fullStars >= 0.5;

  const starIcons = [];
  for (let i = 0; i < fullStars; i++) {
    starIcons.push(
      <span key={i} className="mr-1 text-yellow-400" style={{ fontSize: "24px" }}>
        &#9733;
      </span>,
    );
  }
  if (hasHalfStar) {
    starIcons.push(
      <span key="half" className="star">
        <span
          className="mr-1 text-yellow-400"
          style={{ display: "inline-block", width: "12px", overflow: "hidden", fontSize: "24px" }}
        >
          &#9733;
        </span>
      </span>,
    );
  }
  const emptyStars = 5 - starIcons.length;
  for (let i = 0; i < emptyStars; i++) {
    starIcons.push(
      <span key={`empty${i}`} className="mr-1 text-yellow-400" style={{ fontSize: "24px" }}>
        &#9734;
      </span>,
    );
  }

  //const ratingDisplay = rating === 0 ? roundedRating : rating.toFixed(1);

  return (
    <div className="mt-4 flex">
      {starIcons}
      <span className="ml-2 mt-1 text-gray-600 font-semibold dark:text-gray-400" style={{ fontSize: "16px" }}>
        ({roundedRating})
      </span>
    </div>
  );
};

export default stars;
