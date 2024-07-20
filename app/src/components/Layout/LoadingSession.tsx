import styled from "@emotion/styled";
import CircularProgress from "@mui/material/CircularProgress";
const Loading = styled.div({
  position: "fixed",
  zIndex: 10000,
  display: "flex",
  top: 0,
  left: 0,
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%",
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
