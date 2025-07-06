import TopCommentsCard from "../../../components/cards/TopCommentsCard";

const TopComments = ({ topComments }) => {
  return (
    <div className="bg-base-100 border border-base-300 px-6 py-4 rounded-lg flex gap-4 flex-col">
      <h3 className="font-semibold">Top Comments</h3>
      <div>
        {topComments?.slice(0, 3)?.map((c, i) => (
          <TopCommentsCard key={i} comment={c} />
        ))}
      </div>
    </div>
  );
};

export default TopComments;
