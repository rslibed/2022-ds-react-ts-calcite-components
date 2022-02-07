interface HeaderProps {
  title: string;
}

function Header(props: HeaderProps) {
  return (
    <header slot="header">
      <h1>{props.title}</h1>
    </header>
  );
}

export default Header;
