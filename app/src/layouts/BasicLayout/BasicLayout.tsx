import { Outlet } from 'react-router-dom';
import { Header } from '../../components';
import { Footer } from '../../components';
import { AppLayout, PageContainer } from '../styles';

const BasicLayout = (): JSX.Element => {
  return (
    <AppLayout>
      <Header />
      <PageContainer>
        <Outlet />
      </PageContainer>
      <Footer />
    </AppLayout>
  );
};

export { BasicLayout };
