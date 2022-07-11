function BackButton(props) {
  return (
    <div className="text-center">
      <button
        {...props}
        className="w-auto bg-gray-600 rounded-lg px-4 py-2 text-xl cursor-pointer mt-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-22 w-24"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
            clipRule="evenodd"
          />
        </svg>
        Back
      </button>
    </div>
  );
}

export default BackButton;
