
'use client';
import type { Offer } from "@/models/Offer";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
export default function DeviceRow({ offerDoc }: { offerDoc: Offer }) {
  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "A":
        return "bg-light-green";
      case "A+":
        return "bg-darker-green";
      case "B":
        return "bg-blue";
      case "C":
        return "bg-light-brown";
      default:
        return "bg-gray-200"; // Default color if none of the conditions match
    }
  };
 
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row items-center gap-4 sm:gap-6 relative hover:shadow-lg transition-shadow duration-300">
      <div className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-red-500 transition-colors duration-300">
        <FontAwesomeIcon className="text-lg" icon={faHeart} />
      </div>

      <div className="w-full sm:w-1/6 flex justify-center">
        <img
          src={offerDoc?.offerIcon}
          className="w-24 h-24 object-cover rounded-full border border-gray-300"
        />
      </div>


      <div className="w-full sm:w-1/6 flex flex-col items-center sm:items-start text-center sm:text-left">
        <Link href={'/show/' + offerDoc._id}>
          <span className="text-lg font-semibold text-gray-700 hover:underline">
            {offerDoc?.phone}
          </span>
        </Link>
      </div>
      <div className="w-full sm:w-1/6 flex flex-col items-center sm:items-start text-center sm:text-left">
        <div
          className={`text-lg font-semibold text-gray-700 p-2 rounded-lg ${getQualityColor(offerDoc?.quality)}`}
        >
          {offerDoc?.quality}
        </div>
      </div>
      <div className="w-full sm:w-1/6 flex flex-col items-center sm:items-start text-center sm:text-left">
        <span className="text-lg font-semibold text-gray-700">{offerDoc?.description}</span>
      </div>
      <div className="w-full sm:w-1/6 flex flex-col items-center sm:items-start text-center sm:text-left">
        <div
          className="text-lg font-semibold text-gray-700 p-2 rounded-lg"
          style={{ backgroundColor: offerDoc?.color }}
        >
          {offerDoc?.color}
        </div>
      </div>
      <div className="w-full sm:w-1/6 flex flex-col items-center sm:items-start text-center sm:text-left">
        <span className="text-lg font-semibold text-gray-700">{offerDoc?.quantity} pc.</span>
      </div>
      <div className="w-full sm:w-1/6 flex flex-col items-center sm:items-start text-center sm:text-left">
        <span className="text-lg font-semibold text-gray-700">{offerDoc?.price} EUR</span>
      </div>
      {offerDoc?.isAdmin && (
        <div className="w-full sm:w-1/6 flex flex-col items-center sm:items-start text-center sm:text-left">
          <Link href={'/offers/edit/' + offerDoc._id}>
            <span className="text-lg font-semibold text-gray-700 hover:underline">Edit</span>
          </Link>
          <button
            type="button"
            onClick={async () => {
              await axios.delete('/api/offers?id=' + offerDoc._id);
              window.location.reload();
            }}
            className="mt-2 text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
