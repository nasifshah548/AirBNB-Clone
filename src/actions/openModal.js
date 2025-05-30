export default (openClose, content) => {
  return {
    type: "OPEN MODAL",
    payload: {
      openClose,
      content,
    },
  };
};
