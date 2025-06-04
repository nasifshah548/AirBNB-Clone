const initState = { openClose: "closed", content: "" };

const siteModal = (state = initState, action) => {
  if (action.type === "OPEN_MODAL") {
    return action.payload;
  }
  return state;
};

export default siteModal;
