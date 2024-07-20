import styled from "@emotion/styled";
import CircularProgress from "@mui/material/CircularProgress";

const Container = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "300px",
  width: "100%",
});
const LoadingContainer = ({ loading }: { loading: boolean }) => {
  if (!loading) return null;
  return (
    <Container>
      <CircularProgress />
    </Container>
  );
};

export default LoadingContainer;
