const UserCard = ({ user }) => {
  return (
    <div className="flex justify-center items-center gap-12 mt-10">
      {/* Card */}
      <div className="card-swipe h-[350px] w-[250px] overflow-hidden rounded-xl shadow-lg relative">
        <img
          src={user?.photoUrl || "https://via.placeholder.com/250x350"}
          alt={user?.firstName}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h2 className="text-xl font-bold mb-1">
            {user?.firstName}, {user?.age || ""}
          </h2>
          <p className="text-sm opacity-90 mb-1">@{user?.firstName}</p>
          <p className="text-sm leading-relaxed">{user?.about}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
