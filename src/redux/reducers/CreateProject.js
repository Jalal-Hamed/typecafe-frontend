let initialState = {
  isModalOpen: true,
  firstMount: true,
  step: "uploadfile",
  file: "",
  languages: [],
  numberOfPages: "",
  deliveryDeadline: "",
  description: "",
};

const CreateProject = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_PROJECT":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default CreateProject;
