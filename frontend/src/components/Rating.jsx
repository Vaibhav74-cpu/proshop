import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function Rating({ value, text }) {
  return (
    <div className="rating" style={{ display: "flex", alignItems: "center" }}>
      <span style={{ color: "#f8e825" }}>
        {value >= 1 ? (
          <FaStar />
        ) : value >= 0.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span style={{ color: "#f8e825" }}>
        {value >= 2 ? (
          <FaStar />
        ) : value >= 1.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span style={{ color: "#f8e825" }}>
        {value >= 3 ? (
          <FaStar />
        ) : value >= 2.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span style={{ color: "#f8e825" }}>
        {value >= 4 ? (
          <FaStar />
        ) : value >= 3.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span style={{ color: "#f8e825" }}>
        {value >= 5 ? (
          <FaStar />
        ) : value >= 4.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span
        style={{
          fontSize: "0.8rem",
          fontWeight: "500",
          paddingLeft: "0.5rem",
          marginTop: "8px",
        }}
      >
        {text && text}
      </span>
    </div>
  );
}

export default Rating;
