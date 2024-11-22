import PropTypes from "prop-types";
// import styles from "./Message.module.css";
export default function Message({ message }) {
  return (
    <p>
      <span>🫲</span> {message}
    </p>
  );
}

Message.propTypes = {
  message: PropTypes.string.isRequired, // Ensures `message` is a string and required
};
