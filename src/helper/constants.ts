const Header = () => {
  const token = localStorage.getItem("token");
  const headers = {
    headers: { Authorization: token },
  };

  return headers;
};

// const token = localStorage.getItem("token");
export default Header;
