const GenreateIdeasCard = ({ idea, onClick }) => {
  return (
    <div
      className="bg-base-200 hover:bg-base-300 p-2 rounded cursor-pointer flex gap-2 flex-col"
      onClick={onClick}
    >
      <div className="flex items-center gap-2 flex-wrap">
        <h6 className="text-base leading-5.5 font-semibold">{idea?.title}</h6>
        <span className="badge badge-warning badge-xs">{idea?.tone}</span>
      </div>
      <p className="text-xs text-base-content/50">{idea?.content}</p>
      <div className="flex items-center gap-2 flex-wrap">
        {idea?.tags?.map((tag, index) => (
          <div
            key={index}
            className="badge badge-sm badge-primary rounded px-1"
          >
            #{tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreateIdeasCard;
