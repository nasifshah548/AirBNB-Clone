const openModal = (openClose, content) => {
  return {
    type: "OPEN MODAL",
    payload: {
      openClose,
      content,
    },
  };
};

export default openModal;
