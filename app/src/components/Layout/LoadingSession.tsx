import styled from "@emotion/styled";
import CircularProgress from "@mui/material/CircularProgress";
const Loading = styled.div({
  position: "absolute",
  zIndex: 10000,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100vw",
  backgroundColor: "white",
});
const LoadingSession = ({ loading }: { loading: boolean }) => {
  if (!loading) return null;
  return (
    <Loading>
      <CircularProgress />
    </Loading>
  );
};
export default LoadingSession;
