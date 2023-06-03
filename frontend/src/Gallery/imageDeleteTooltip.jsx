import React from "react";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";

DeleteTooltip.propTypes = {
  imageId: PropTypes.number,
};

export default function DeleteTooltip(props) {
  const deleteImage = (event) => {
    // prevent opening gallery
    event.stopPropagation();
    console.log("delete image " + props.imageId);
  };
  return (
    <Tooltip
      sx={{
        position: "absolute",
        right: 0,
        top: 0,
        background: "grey",
        cursor: "pointer",
      }}
    >
      <DeleteIcon onClick={deleteImage} />
    </Tooltip>
  );
}
