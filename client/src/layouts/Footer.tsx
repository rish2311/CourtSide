const Footer = () => {
  return (
    <footer className="border-t border-outline-variant/30 py-lg text-center">
      <p className="text-label-sm text-outline">
        &copy; {new Date().getFullYear()} CourtSide. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
