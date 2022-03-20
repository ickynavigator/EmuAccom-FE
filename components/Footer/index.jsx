import styles from "../../styles/components/Footer.module.scss";

export const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <a href="/" rel="noopener noreferrer">
          Emu Accom
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          {/* TODO add a github url here */}
          Github source code
        </a>
      </footer>
    </>
  );
};
export default Footer;
