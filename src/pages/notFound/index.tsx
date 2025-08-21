import Errors from '@components/errors';
import { Container } from './styles';

const NotFound = () => {
  return (
    <Container>
      <Errors title="404" message=" Desculpe, a página que você está procurando não existe."/>
    </Container>
  );
};

export default NotFound;
