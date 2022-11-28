import { CSSProperties } from 'react';

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  const style: CSSProperties = {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flex: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#2d2d2d',
    color: 'white',
    fontWeight: 100,
    fontSize: '3rem',
  };

  return <div style={style}>{children}</div>;
}

export default Layout;
