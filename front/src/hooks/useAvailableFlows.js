import useRequest from "./useRequest";

const useAvailableFlows = () => {
  const { data = [] } = useRequest("http://localhost:3001/get-available-flows");

  return data;
};

export default useAvailableFlows;
