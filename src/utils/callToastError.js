import React from "react";
import { toast } from "react-toastify";

const toastView = (err, handler) => (
  <>
    {err}{" "}
    <button
      style={{
        backgroundColor: "transparent",
        border: 0,
        outline: 0,
        color: "#4287f5",
        cursor: "pointer",
        fontSize: "inherit",
        textDecoration: "underline",
        padding: 0,
        margin: 0
      }}
      onClick={handler}
      type="button"
    >
      refresh recent request
    </button>
  </>
);

export const callToastError = ({
  errorMessage,
  reducerActionType,
  callHandler
}) =>
  toast.error(
    toastView(`${errorMessage} (${reducerActionType})`, callHandler),
    {
      position: "bottom-center"
    }
  );
