function Review(props) {
  //   const detail = props.details;
  //   console.log("this is review", props.details);
  return (
    <>
      <div className="bg-gray-10 border border-gray-200 w-100  rounded-xl p-6 pl-10 shadow-md space-y-2 ">
        <div className="flex items-center gap-3">
          <div className="bg-blue-200 w-12 h-12 rounded-full flex items-center justify-center text-xl">
            👩🏻‍💼
          </div>
          <h1 className="text-xl font-semibold text-gray-800">
            {props.details.reviewerName}
          </h1>
        </div>

        <p className="text-yellow-400 text-lg">
          {"★".repeat(Math.round(props.details.rating))}
          <span className="text-sm text-gray-600 ml-2">
            {props.details.rating} / 5
          </span>
        </p>

        <p className="text-sm text-green-600 font-medium italic">
          ✅ Verified Purchase
        </p>

        <p className="text-base text-gray-700 leading-relaxed">
          “{props.details.comment}”
        </p>
      </div>
    </>
  );
}
export default Review;
