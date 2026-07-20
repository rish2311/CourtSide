import { useParams } from "react-router-dom";

const VenueDetailsPage = () => {
  const { id } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Venue Details</h1>
      <p>Details for venue ID: {id}</p>
    </div>
  );
};

export default VenueDetailsPage;
