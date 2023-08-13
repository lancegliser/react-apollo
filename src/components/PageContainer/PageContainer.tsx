import { FunctionComponent, ReactNode } from "react";
import Styles from "./PageContainer.module.css";

type PageContainerProps = {
  children: ReactNode;
};
const PageContainer: FunctionComponent<PageContainerProps> = ({ children }) => {
  return <div className={Styles.root}>{children}</div>;
};
export default PageContainer;
