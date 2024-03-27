import StarRating from "./StarRating";

const ReviewCard = ({ review, isLast }) => {

  const convertDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <>
      <div className='flex flex-col my-6'>
        <div className='mb-2'>
          <StarRating
            starValue={review?.rating}
            showProgressBar={false} />
        </div>
        <div className='flex'>
          <strong
            style={{
              lineHeight: '1.4',
              fontSize: '100%',
              marginBottom: "1.37931em",
              textRendering: 'optimizeLegibility',
              fontWeight: '600',
            }}
          >
            {review?.userId?.displayName}
          </strong>
          <span className='mx-2'>-</span>
          <span
            style={{
              fontSize: '100%',
              lineHeight: '1.6',
              textRendering: 'optimizeLegibility',
              color: '#333'
            }}
          >
            {convertDate(review?.createdAt)}
          </span>
        </div>
        <span className='italic text-[#555]'
          style={{
            lineHeight: '1.4'
          }}>
          {review?.review}
        </span>
      </div>
      {!isLast && <hr />}
    </>
  )
}

export default ReviewCard;