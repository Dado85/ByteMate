const EmptyState = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-24 text-gray-500">
      <img
        src="/no-users.svg"
        alt="No users"
        className="w-40 mb-4 opacity-80"
      />
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
};

export default EmptyState;
